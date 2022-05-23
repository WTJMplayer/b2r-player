import React, { useState, useEffect, useRef, useCallback } from 'react'
import AudioControls from './AudioControls'
import Backdrop from './Backdrop'

import quiet from '../audio/quiet'
import {
  VStack,
  VisuallyHidden,
  ControlBox,
  Icon,
  HStack,
  Text,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { invertColor } from './utils/helpers'

const AudioPlayer = ({ tracks }) => {
  // state
  const [queue, setQueue] = useState(tracks.map((track) => ({ ...track })))
  const [trackIndex, setTrackIndex] = useState(0)
  const [trackProgress, setTrackProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const { title, artist, color, image } = queue[trackIndex]
  const [volume, setVolume] = useState(1)

  //refs

  const queueRef = useRef(queue)
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

  audioRef.current.mediaElement.muted = isMuted

  const durationRef = useRef(audioRef.current.mediaElement.duration)

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
      draw(canvasRef.current.getContext('2d'))
    }, 1000 / 24),
  )

  const onScrub = (value) => {
    clearInterval(intervalRef.current)
    audioRef.current.mediaElement.currentTime = value
    setTrackProgress(value)
  }

  const onScrubEnd = () => {
    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.mediaElement.currentTime)
      draw(canvasRef.current.getContext('2d'))
    }, 1000 / 24)
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
    if (audioRef.current.mediaElement.muted) {
      audioRef.current.mediaElement.muted = false
    } else {
      audioRef.current.mediaElement.muted = true
    }
  }, [isMuted])

  useEffect(() => {
    if (audioRef.current.mediaElement.volume !== volume) {
      audioRef.current.mediaElement.volume = volume
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

  const canvasRef = useRef(null)
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
      barHeight = dataArray[i] / 3
      context.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
      context.fillRect(x, -barHeight / 2.5, barWidth, barHeight)
      x += barWidth + 1
    }
  }, [])

  return (
    <div className="audio-player">
      <canvas
        ref={canvasRef}
        className="audio-visualizer"
        width={window.innerWidth}
        height="45"
        style={{ position: 'absolute', top: '0', left: '0', opacity: '0.25' }}
      ></canvas>

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
      />
      {/* Progress bar */}
      <input
        type="range"
        className="progress"
        min="0"
        max={audioRef.current.mediaElement.duration}
        value={trackProgress}
        onChange={(e) => onScrub(e.target.value)}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
        style={{ background: trackStyling }}
      />
    </div>
  )
}

export default AudioPlayer
