import React from "react";
import { ReactComponent as Play } from "../images/play.svg";
import { ReactComponent as Pause } from "../images/pause.svg";
import { ReactComponent as Next } from "../images/next.svg";
import { ReactComponent as Prev } from "../images/prev.svg";

const AudioControls = ({
    isPlaying,
    onPlayPauseClick,
    onPrevClick,
    onNextClick,
}) => (
    <div className="audio-controls">
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
                onClick={() => onPlayPauseClick(false)}
            >
                <Pause />
            </button>
        ) : (
            <button
                type="button"
                className="play"
                aria-label="Play"
                onClick={() => onPlayPauseClick(true)}
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
);

export default AudioControls;