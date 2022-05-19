import React, { useState, useEffect, useRef } from 'react'
import AudioControls from './AudioControls'
import Backdrop from './Backdrop'
import { Howl } from 'howler'

const AudioPlayer = ({ tracks }) => {
  //state

  const [trackIndex, setTrackIndex] = useState(0)
  const [trackProgress, setTrackProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const { title, artist, color, image } = tracks[trackIndex]

  //refs
  const queue = useRef(tracks.map((track) => track.audioSrc))
  const audioRef = useRef(
    new Howl({
      src: queue.current[trackIndex],
      usingWebAudio: true,
      html5: true,
      format: ['ogg'],
    }),
  )

  const intervalRef = useRef()
  

  let duration = audioRef.current._duration
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%'
  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #888))
  `
  const startTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.seek())
    }, [1000])
  }

  audioRef.current.on('end', () => {
    toNextTrack()
  })

  const onScrub = (value) => {
    clearInterval(intervalRef.current)
    audioRef.current.seek(value)
    setTrackProgress(audioRef.current.seek())
  }

  const onScrubEnd = () => {
    if (!audioRef.current.playing()) {
      audioRef.current.play()
    } 
    startTimer()
  }

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1)
    } else {
      setTrackIndex(trackIndex - 1)
    }
  }

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1)
    } else {
      setTrackIndex(0)
    }
  
  }

  useEffect(() => {
    if (!audioRef.current.playing()) {
      audioRef.current.play()
      setIsPlaying(true)
      startTimer()
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [isPlaying])

  useEffect(() => {
    audioRef.current.stop()
    setIsPlaying(false)
    audioRef.current.unload()
    audioRef.current._src = queue.current[trackIndex]
    audioRef.current.load()
    audioRef.current.play()
    setIsPlaying(true)
    setTrackProgress(0)
    startTimer()
  }, [trackIndex])

  return (
    <div className="audio-player">
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
        onPrevClick={toPrevTrack}
        onNextClick={toNextTrack}
        onPlayPauseClick={setIsPlaying}
      />
      <input
        type="range"
        className="progress"
        min="0"
        max={duration ? duration : `${duration}`}
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
