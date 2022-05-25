import React, { useState, useEffect, useRef, useCallback } from 'react'
import AudioControls from './AudioControls'
import Backdrop from './Backdrop'
import { invertColor } from './utils/helpers'

const AudioPlayer = ({ tracks, safeMode }) => {
  // state
  const [queue, setQueue] = useState(tracks.map((track) => ({ ...track })))
  const queueRef = useRef(queue)

  const [trackIndex, setTrackIndex] = useState(0)
  const [trackProgress, setTrackProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const { title, artist, color, image } = queueRef.current[trackIndex]
  const [volume, setVolume] = useState(0)
  const [vizToggle, setVizToggle] = useState(false)
  //refs
  const canvas = useRef()
  const context = useRef()

  const audioContextRef = useRef(
    new AudioContext({
      latencyHint: 'playback',
    }),
  )

  const audioRef = useRef(
    audioContextRef.current.createMediaElementSource(new Audio()),
  )

  audioRef.current.mediaElement.crossOrigin = 'anonymous'

  const analyzer = useRef(audioContextRef.current.createAnalyser())

  audioRef.current.connect(analyzer.current)

  analyzer.current.connect(audioContextRef.current.destination)
  analyzer.current.smoothingTimeConstant = 0.8
  audioRef.current.mediaElement.muted = isMuted

  const durationRef = useRef(audioRef.current.mediaElement.duration)
  const prevVolume = useRef(1)

  const currentPercentage = audioRef.current.mediaElement.duration
    ? `${(trackProgress / audioRef.current.mediaElement.duration) * 100}%`
    : '0%'
  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, ${invertColor(
    color,
  )}), color-stop(${currentPercentage}, #fff))
  `

  const intervalRef = useRef(
    setInterval(() => {
      setTrackProgress(audioRef.current.mediaElement.currentTime)
      if (!vizToggle) {
        return
      }
      try {
        canvas.current = document.querySelector('canvas')
        context.current = canvas.current.getContext('2d')
        draw(context.current)
      } catch (error) {
        console.log(error)
      }
    }, 1000 / 6),
  )

  const onScrub = (value) => {
    clearInterval(intervalRef.current)
    audioRef.current.mediaElement.currentTime = value
    setTrackProgress(value)
  }

  const onScrubEnd = () => {
    setInterval(() => {
      setTrackProgress(audioRef.current.mediaElement.currentTime)
      if (!vizToggle) {
        return
      }
      try {
        canvas.current = document.querySelector('canvas')

        draw(context.current)
      } catch (error) {
        console.log(error)
      }
    }, 1000 / 6)
  }

  const toPrevTrack = useCallback(() => {
    setIsPlaying(false)
    if (trackIndex - 1 < 0) {
      setTrackIndex(queueRef.current.length - 1)
    } else {
      setTrackIndex(trackIndex - 1)
    }
  }, [trackIndex])

  const toNextTrack = useCallback(() => {
    setIsPlaying(false)
    if (trackIndex === queueRef.current.length - 1) {
      setTrackIndex(0)
    } else {
      setTrackIndex(trackIndex + 1)
    }
  }, [trackIndex])

  useEffect(() => {
    audioRef.current.mediaElement.muted = isMuted
    if (isMuted) {
      if (audioRef.current.mediaElement.volume !== 0) {
        prevVolume.current = audioRef.current.mediaElement.volume
      }
      setVolume(0)
    } else {
      setVolume(prevVolume.current)
    }
  }, [isMuted])

  useEffect(() => {
    if (audioRef.current.mediaElement.volume !== volume) {
      audioRef.current.mediaElement.volume = volume
    }
    if (volume > 0) {
      setIsMuted(false)
    } else {
      setIsMuted(true)
    }
  }, [volume])

  useEffect(() => {
    console.log(`isPlaying state changed to ${isPlaying}`)
    console.log(audioRef.current.mediaElement.src)
    if (isPlaying) {
      audioRef.current.mediaElement.play()
    } else {
      audioRef.current.mediaElement.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    queueRef.current = queue
  }, [queue])

  useEffect(() => {
    if (safeMode) {
      setQueue(queueRef.current.filter((track) => !track.explicit))
    } else {
      setQueue(tracks.map((track) => ({ ...track })))
    }
  }, [safeMode])

  useEffect(() => {
    console.log(`trackIndex state changed to ${trackIndex}`)
    audioRef.current.mediaElement.pause()
    audioRef.current.mediaElement.src = queueRef.current[trackIndex].audioSrc
    audioRef.current.mediaElement.load()
    durationRef.current = audioRef.current.mediaElement.duration
    audioRef.current.mediaElement.addEventListener('canplaythrough', () => {
      setIsPlaying(true)
    })
    audioRef.current.mediaElement.addEventListener('ended', () => {
      toNextTrack()
    })
  }, [trackIndex, toNextTrack])

  //visualizer

  const draw = useCallback((context) => {
    const bufferLength = 128
    const dataArray = new Uint8Array(bufferLength)
    analyzer.current.getByteFrequencyData(dataArray)

    context.fillStyle = 'rgb(0, 0, 0)'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    var barWidth = (context.canvas.width / bufferLength) * 2.5
    var barHeight
    var x = 0
    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i]
      context.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
      context.fillRect(x, -barHeight / 2.5, barWidth, barHeight)
      x += barWidth + 1
    }
  }, [])

  return (
    <div className="audio-player">
      {vizToggle ? (
        <canvas
          id="canvas"
          className="audio-visualizer"
          width={window.innerWidth}
          height={window.innerHeight * 2}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            opacity: '.5',
            zIndex: '-1',
          }}
        />
      ) : (
        <canvas
          id="canvas"
          className="audio-visualizer"
          width={window.innerWidth}
          height={window.innerHeight * 2}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            opacity: '0',
            zIndex: '-1',
          }}
        />
      )}

      <div className="track-info">
        <img
          className="artwork"
          src={image}
          alt={`track artwork for ${title} by ${artist}`}
        />
        <h2 className="title">{title}</h2>
        <h3 className="artist">{artist}</h3>
      </div>
      <Backdrop
        trackIndex={trackIndex}
        activeColor={color}
        isPlaying={isPlaying}
      />
      <AudioControls
        isPlaying={isPlaying}
        isMuted={isMuted}
        volume={volume}
        onPrevClick={toPrevTrack}
        onNextClick={toNextTrack}
        onPlayPauseClick={() => setIsPlaying(!isPlaying)}
        onMuteClick={() => setIsMuted(!isMuted)}
        onVolumeChange={(e) => setVolume(e.target.value)}
        onToggle={() => setVizToggle(!vizToggle)}
        vizToggle={vizToggle}
      />
      {/* Progress bar */}
      <input
        type="range"
        className="progress"
        min="0"
        max={audioRef.current.mediaElement.duration}
        value={trackProgress}
        onChange={(e) => onScrub(e.target.value)}
        // onMouseUp={onScrubEnd}
        // onKeyUp={onScrubEnd}
        style={{ background: trackStyling }}
      />
    </div>
  )
}

export default AudioPlayer
