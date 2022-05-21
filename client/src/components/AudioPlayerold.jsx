import React, { useState, useEffect, useRef } from 'react'
import AudioControls from './AudioControls'
import Backdrop from './Backdrop'
import { Howl } from 'howler'
import silence from '../audio/1-hour-of-silence.ogg'
const AudioPlayer = ({ tracks }) => {
  // state
  const [trackIndex, setTrackIndex] = useState(0)
  const [trackProgress, setTrackProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const { title, artist, color, image } = tracks[trackIndex]
  const [volume, setVolume] = useState(1)
  const [queue, setQueue] = useState(tracks.map((track) => track.audioSrc))

  //refs

  const indexRef = useRef(trackIndex)
  const queueRef = useRef(queue)
  const audioRef = useRef(
    new Howl({
      src: [silence],
      usingWebAudio: false,
      html5: true,
      format: ['ogg'],
      preload: true,
      autoplay: false,
      mute: true,

      onend: () => {
        toNextTrack()
      },

      onload: () => {
        durationRef.current = audioRef.current.duration()
        
      },
    }),
  )

  const init = useRef(true)
  const initOver = useRef(false)
  const count = useRef(0)
  const intervalRef = useRef()
  const trackId = useRef()
  const durationRef = useRef(0)

  const currentPercentage = durationRef.current
    ? `${(trackProgress / durationRef.current) * 100}%`
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

  const onScrub = (value) => {
    clearInterval(intervalRef.current)
    audioRef.current.seek(value)
    setTrackProgress(value)
  }

  const onScrubEnd = () => {
    startTimer()
  }

  const toPrevTrack = () => {
    setIsPlaying(false)
    if (indexRef.current - 1 < 0) {
      setTrackIndex(queueRef.current.length - 1)
    } else {
      setTrackIndex(indexRef.current - 1)
    }
  }

  const toNextTrack = () => {
    setIsPlaying(false)
    if (indexRef.current === queueRef.current.length - 1) {
      setTrackIndex(0)
    } else {
      setTrackIndex(indexRef.current + 1)
    }
  }

  useEffect(() => {
    if (audioRef.current.mute()) {
      audioRef.current.mute(false)
    } else {
      audioRef.current.mute(true)
    }
  }, [isMuted])

  useEffect(() => {
    if (audioRef.current.volume() !== volume) {
      audioRef.current.volume(volume)
    }
  }, [volume])

  useEffect(() => {
    console.log(`isPlaying state changed to ${isPlaying}`)

    if (init.current) {
      console.log('initial render, skipping useEffect')
      return
    } else {
      console.log('post initial render, calling useEffect')

      if (!isPlaying) {
        audioRef.current.pause()

        clearInterval(intervalRef.current)
      } else {
        audioRef.current.play(trackId.current)
        startTimer()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    setTrackProgress(0)
    if (init.current) {
      count.current++
      
      if (count.current === 2) {
        init.current = false
        audioRef.current.load()
        audioRef.current.play()
        audioRef.current.seek(3599.99)
        initOver.current = true
        
        
      }
    } else {
      
      if (initOver.current) {
        initOver.current = false  
        
        return
    
    }
      indexRef.current = trackIndex

      console.log('post initial render, calling all trackIndex hooks')
      setIsPlaying(false)

      audioRef.current.stop()
      audioRef.current.unload()
      audioRef.current._src = queueRef.current[trackIndex]

      audioRef.current.load()
      trackId.current = audioRef.current._sounds[0]._id
     audioRef.current.mute(false)
    setIsPlaying(true)
  }

    startTimer()
  }, [trackIndex, tracks])

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
        onPlayPauseClick={() => setIsPlaying(!isPlaying)}
      />
      <input
        type="range"
        className="progress"
        min="0"
        max={durationRef.current}
        value={trackProgress}
        onChange={(e) => onScrub(e.target.value)}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
        style={{ background: trackStyling }}
      />
      <input
        type="checkbox"
        className="mute"
        value={isMuted}
        onClick={() => setIsMuted(!isMuted)}
      />
      <input
        type="range"
        className="volume"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
      />
    </div>
  )
}

export default AudioPlayer
