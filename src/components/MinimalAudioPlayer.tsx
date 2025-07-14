import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faMusic,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./MinimalAudioPlayer.css";

// Fix: Change from "./assets" to "../assets" (go up one directory)
//import feelsLikeGoodbyeAudio from "../assets/audio/feelslikegoodbye.mp3";
//import lovelyMessAudio from "../assets/audio/lovelymess.mp3";
//import whileImBreathingAudio from "../assets/audio/breathing.mp3";

// Alternative: If files are in public/audio/, use direct URLs
const feelsLikeGoodbyeAudio = "/audio/feelslikegoodbye.mp3";
const lovelyMessAudio = "/audio/lovelymess.mp3";
const whileImBreathingAudio = "/audio/breathing.mp3";

interface Track {
  title: string;
  file: string;
}

interface MinimalAudioPlayerProps {
  isVisible: boolean;
}

const MinimalAudioPlayer: React.FC<MinimalAudioPlayerProps> = ({
  isVisible,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks: Track[] = [
    { title: "Feels Like Goodbye", file: feelsLikeGoodbyeAudio },
    { title: "Lovely Mess", file: lovelyMessAudio },
    { title: "While I'm Breathing", file: whileImBreathingAudio },
  ];

  const formatTime = (seconds: number): string => {
    if (!seconds || !isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const loadTrack = (index: number): void => {
    if (tracks.length === 0) return;

    if (index < 0) index = tracks.length - 1;
    if (index >= tracks.length) index = 0;

    setCurrentTrackIndex(index);

    if (audioRef.current && tracks[index] && tracks[index].file) {
      try {
        audioRef.current.src = tracks[index].file;
        audioRef.current.load();
        setIsLoaded(true);

        if (isPlaying) {
          audioRef.current.play().catch((error) => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
          });
        }
      } catch (error) {
        console.error("Error loading track:", error);
        setIsLoaded(false);
      }
    }
  };

  const togglePlay = (): void => {
    if (tracks.length === 0) return;

    if (!isLoaded) {
      loadTrack(currentTrackIndex);
      return;
    }

    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const prevTrack = (): void => {
    loadTrack(currentTrackIndex - 1);
  };

  const nextTrack = (): void => {
    loadTrack(currentTrackIndex + 1);
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
      nextTrack();
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("ended", handleEnd);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("ended", handleEnd);
      };
    }
  }, [currentTrackIndex]);

  if (!isVisible || tracks.length === 0) {
    return null;
  }

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  return (
    <>
      {/* Minimal floating button */}
      <button
        className="minimal-player-button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <FontAwesomeIcon icon={faMusic} />
      </button>

      {/* Expanded player */}
      {isExpanded && (
        <div className="minimal-player-modal">
          <div className="minimal-player-container">
            <button
              className="minimal-player-close"
              onClick={() => setIsExpanded(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="minimal-player-content">
              <h4>Soundtrack</h4>
              
              <div className="minimal-track-info">
                <span className="minimal-track-title">{currentTrack.title}</span>
              </div>

              <div className="minimal-player-controls">
                <button
                  className="minimal-control-btn"
                  onClick={prevTrack}
                  title="Previous"
                >
                  <FontAwesomeIcon icon={faBackward} />
                </button>
                <button
                  className="minimal-control-btn minimal-play-btn"
                  onClick={togglePlay}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                <button
                  className="minimal-control-btn"
                  onClick={nextTrack}
                  title="Next"
                >
                  <FontAwesomeIcon icon={faForward} />
                </button>
              </div>

              <div className="minimal-progress-section">
                <input
                  type="range"
                  className="minimal-progress-bar"
                  value={(currentTime / duration) * 100 || 0}
                  onChange={handleSeek}
                  min="0"
                  max="100"
                />
                <div className="minimal-time-info">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="minimal-track-list">
                {tracks.map((track, index) => (
                  <div
                    key={index}
                    className={`minimal-track-item ${
                      index === currentTrackIndex ? "active" : ""
                    }`}
                    onClick={() => {
                      loadTrack(index);
                      setIsPlaying(true);
                    }}
                  >
                    <span className="minimal-track-num">{index + 1}.</span>
                    <span className="minimal-track-name">{track.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <audio ref={audioRef}>
        {isLoaded && currentTrack && (
          <source
            src={currentTrack.file}
            type={
              currentTrack.file.endsWith(".wav") ? "audio/wav" : "audio/mpeg"
            }
          />
        )}
      </audio>
    </>
  );
};

export default MinimalAudioPlayer;
