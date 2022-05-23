import React from 'react'
import { ReactComponent as Play } from '../images/play.svg'
import { ReactComponent as Pause } from '../images/pause.svg'
import { ReactComponent as Next } from '../images/next.svg'
import { ReactComponent as Prev } from '../images/prev.svg'
import { ReactComponent as Mute } from '../images/mute.svg'
import { ReactComponent as Unmute } from '../images/unmute.svg'


const AudioControls = ({
  
    volume,
    onVolumeChange,
  isPlaying,
  isMuted,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
  onMuteClick,
}) => (
  <div className="audio-controls">

    <div className="playback-controls">
      <button
        type="button"
        className="prev"
        aria-label="Previous"
        onClick={onPrevClick}
      >
        <Prev />
      </button>
      {isPlaying ? (
        <button
          type="button"
          className="pause"
          aria-label="Pause"
          onClick={() => onPlayPauseClick()}
        >
          <Pause />
        </button>
      ) : (
        <button
          type="button"
          className="play"
          aria-label="Play"
          onClick={() => onPlayPauseClick()}
        >
          <Play />
        </button>
      )}
      <button
        type="button"
        className="next"
        aria-label="Next"
        onClick={onNextClick}
      >
        <Next />
      </button>
    </div>

    <div className="volume-controls">
      {isMuted ? (
        <div className="align-left">
          <button
            type="button"
            className="mute"
            aria-label="Mute"
            onClick={() => onMuteClick()}
          >
            <Mute />
          </button>
        </div>
      ) : (
        <div className="align-left">
          <button
            type="button"
            className="unmute"
            aria-label="Unmute"
            onClick={() => onMuteClick()}
          >
            <Unmute />
          </button>
        </div>
      )}
       <input
        type="range"
        className="volume"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolumeChange}
        
      />
    </div>
  </div>
)

export default AudioControls
