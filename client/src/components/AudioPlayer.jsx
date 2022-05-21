import React, { useState, useEffect, useRef } from 'react'
import AudioControls from './AudioControls'
import Backdrop from './Backdrop'
import { Howl, } from 'howler'
import silence from '../audio/1-hour-of-silence.ogg'
const AudioPlayer = ({ tracks }) => {
  const [trackIndex, setTrackIndex] = useState(0)
  const [trackProgress, setTrackProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const { title, artist, color, image } = tracks[trackIndex]

  //refs
  const indexRef = useRef(trackIndex)
  const queue = useRef(tracks.map((track) => track.audioSrc))
  const audioRef = useRef(
    new Howl({
      src: [silence],
      usingWebAudio: true,
      html5: true,
      format: ['ogg'],
      preload: false,
      autoplay: true,
      mute: true,

      onend: () => {
        console.log('onend hook called')
        toNextTrack()
      },
      onload: () => {
        console.log('onload hook called')
        durationRef.current = audioRef.current.duration()
        audioRef.current._sounds[0]._stop = durationRef.current
        // audioRef.current.play()
        setTrackProgress(0)
      },
    }),
  )

  const init = useRef(true)
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
      setTrackProgress(audioRef.current.seek(trackId.current))
    }, [1000])
  }

  const onScrub = (value) => {
    clearInterval(intervalRef.current)
    audioRef.current.seek(value)
    audioRef.current.seek(trackId.current)
    setTrackProgress(audioRef.current.seek(trackId.current))
  }

  const onScrubEnd = () => {
    startTimer()
  }

  const toPrevTrack = () => {
    setIsPlaying(false)
    if (indexRef.current - 1 < 0) {
      setTrackIndex(queue.current.length - 1)
    } else {
      setTrackIndex(indexRef.current - 1)
    }
  }

  const toNextTrack = () => {
    setIsPlaying(false)

    console.log(`trackIndex before updating: ${indexRef.current}`)
    if (indexRef.current === queue.current.length - 1) {
      setTrackIndex(0)
      console.log(`end of playlist trackIndex: ${trackIndex}`)
    } else {
      setTrackIndex(indexRef.current + 1)
      console.log(`trackIndex: ${trackIndex}`)
    }
  }

  useEffect(() => {
    console.log(`isPlaying state changed to ${isPlaying}`)

    if (init.current) {
      console.log('initial render, skipping useEffect')
      return
    } else {
      console.log('post initial render, calling useEffect')

      if (isPlaying) {
        audioRef.current.play(trackId.current)

        setTrackProgress(audioRef.current.seek(trackId.current))

        startTimer()

        console.log(
          `expected duration value:${audioRef.current.duration()} actual:${
            durationRef.current
          }`,
        )
      } else {
        audioRef.current.pause()
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  useEffect(() => {
    setTrackProgress(0)
    console.log(`trackIndex state changed to ${trackIndex}`)
    if (init.current) {
      console.log('initial render, skipping some trackIndex hooks')
      if (count.current === 1) {
      }
      count.current++

      if (count.current === 2) {
        
        audioRef.current.load()
        
        audioRef.current.seek(3599.99)
      }
      if (count.current === 3) {
        init.current = false
        setTrackIndex(0)
        count.current++
      }
    } else {
      indexRef.current = trackIndex
      console.log('post initial render, calling all trackIndex hooks')
      setIsPlaying(false)
      
      
      audioRef.current.unload()
      audioRef.current._src = queue.current[trackIndex]

      audioRef.current.load()
      audioRef.current._duration = durationRef.current
      trackId.current = audioRef.current._sounds[0]._id

       if(count.current === 4) {
        count.current++
        audioRef.current.mute(false)
        return
      }

      setIsPlaying(true)

      startTimer()
    }
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
        onPlayPauseClick={setIsPlaying}
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
    </div>
  )
}

export default AudioPlayer
