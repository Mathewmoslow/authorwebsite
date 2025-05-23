import React, { useState, useRef, useEffect } from "react";

// Import audio snippets
import novelDivorceSnippet from "../assets/audio/noveldivorcesnippet.mp3";
import blakeHallSnippet from "../assets/audio/blakehall.mp3";

interface AudioPreviewProps {
  bookType: "novel-divorce" | "year-and-day";
  isPlaying: boolean;
  onPlayStateChange: (playing: boolean) => void;
}

const AudioPreview: React.FC<AudioPreviewProps> = ({
  bookType,
  isPlaying,
  onPlayStateChange,
}) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const audioFiles = {
    "novel-divorce": novelDivorceSnippet,
    "year-and-day": blakeHallSnippet,
  };

  const formatTime = (seconds: number): string => {
    if (!seconds || !isFinite(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const loadAudio = (): void => {
    if (audioRef.current) {
      audioRef.current.src = audioFiles[bookType];
      audioRef.current.load();
      setIsLoaded(true);
    }
  };

  const togglePlay = (): void => {
    if (!isLoaded) {
      loadAudio();
    }

    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(console.error);
        onPlayStateChange(true);
      } else {
        audioRef.current.pause();
        onPlayStateChange(false);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const seekTime = (Number(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = (): void => {
      if (audio) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      }
    };

    const handleEnd = (): void => {
      onPlayStateChange(false);
    };

    const handlePause = (): void => {
      onPlayStateChange(false);
    };

    const handlePlay = (): void => {
      onPlayStateChange(true);
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("ended", handleEnd);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("play", handlePlay);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("ended", handleEnd);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("play", handlePlay);
      };
    }
  }, [onPlayStateChange]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && audioRef.current.paused) {
        if (!isLoaded) loadAudio();
        audioRef.current.play().catch(console.error);
      } else if (!isPlaying && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isLoaded]);

  return (
    <div className="audio-preview">
      <div className="audio-preview-header">
        <h4>Audio Preview</h4>
        <button className="audio-play-btn" onClick={togglePlay}>
          <i className={`fas fa-${isPlaying ? "pause" : "play"}`}></i>
          {isPlaying ? "Pause" : "Play"} Preview
        </button>
      </div>

      {(isLoaded || isPlaying) && (
        <div className="audio-progress">
          <input
            type="range"
            className="audio-progress-bar"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            min="0"
            max="100"
          />
          <div className="audio-time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      )}

      <audio ref={audioRef} preload="metadata">
        {isLoaded && <source src={audioFiles[bookType]} type="audio/mpeg" />}
      </audio>
    </div>
  );
};

export default AudioPreview;
