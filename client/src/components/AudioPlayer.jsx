import React, { useState, useEffect, useRef, useCallback } from 'react'
import AudioControls from './AudioControls'
import Backdrop from './Backdrop'
import quiet from '../audio/quiet'
import {
  VStack ,
  VisuallyHidden,
  ControlBox,
  Icon,
  HStack,
  Text,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'; 

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
  const audioRef = useRef(new Audio(queue[0].audioSrc))
  audioRef.current.muted = isMuted
  const intervalRef = useRef()
  const durationRef = useRef(audioRef.current.duration)

  const currentPercentage = durationRef.current
    ? `${(trackProgress / durationRef.current) * 100}%`
    : '0%'
  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #888))
  `
  const startTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.currentTime)
    }, [1000])
  }

  const onScrub = (value) => {
    clearInterval(intervalRef.current)
    audioRef.current.currentTime = value
    setTrackProgress(value)
  }

  const onScrubEnd = () => {
    startTimer()
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
    if (audioRef.current.muted) {
      audioRef.current.muted = false
    } else {
      audioRef.current.muted = true
    }
  }, [isMuted])

  useEffect(() => {
    if (audioRef.current.volume !== volume) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    console.log(`isPlaying state changed to ${isPlaying}`)
    console.log(audioRef.current.currentSrc)
    if (isPlaying) {
      audioRef.current.play()
      startTimer()
    } else {
      audioRef.current.pause()
      clearInterval(intervalRef.current)
    }
  }, [isPlaying])
useEffect(() => {
  queueRef.current = queue
}, [queue])
  useEffect(() => {
    console.log(`trackIndex state changed to ${trackIndex}`)
    audioRef.current.pause()
    audioRef.current.src = queueRef.current[trackIndex].audioSrc
    audioRef.current.load()
    durationRef.current = audioRef.current.duration
    audioRef.current.addEventListener('canplaythrough', () => {
      setIsPlaying(true)
    })
    audioRef.current.addEventListener('ended', () => {
      toNextTrack()
    })

    startTimer()
  }, [trackIndex, toNextTrack])

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
      {/* Progress bar */}
      <input
        type="range"
        className="progress"
        min="0"
        max={audioRef.current.duration}
        value={trackProgress}
        onChange={(e) => onScrub(e.target.value)}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
        style={{ background: trackStyling }}
      />
      {/* Queue Setup */}
      <input
        type="button"
        className="queue-push-test"
        value="Add to Queue"
        onClick={() => {
          tracks.push(quiet[0])
          setQueue([...tracks])
          queueRef.current = queue
        }}
      />
      {/* Mute Button */}
      <VStack>
        <VisuallyHidden></VisuallyHidden>
        <label>
        <HStack>
        <VisuallyHidden as="input" type="checkbox"/>
          <ControlBox
                    borderWidth="1px"
                    size="24px"
                    rounded="sm"
                    _checked={{ bg: "red", color: "black", borderColor: "red" }}
                    _focus={{ borderColor: "green.600", boxShadow: "outline" }}
                    value={isMuted}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    <Icon as={CheckIcon} name="check" size="16px" />
          </ControlBox>
              <Text ml={2}>Mute </Text>
          </HStack>
        </label>

      {/* Volume Slider */}
      <input
        type="range"
        className="volume"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
      />
    </VStack>
    </div>
  )
}

export default AudioPlayer
