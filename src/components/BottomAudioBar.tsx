import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faVolumeUp,
  faList,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./BottomAudioBar.css";

// Audio files from public directory
const tracks = [
  { title: "Feels Like Goodbye", file: "/audio/feelslikegoodbye.mp3" },
  { title: "Lovely Mess", file: "/audio/lovelymess.mp3" },
  { title: "While I'm Breathing", file: "/audio/breathing.mp3" },
  { title: "Fine Wine and Fine Lines", file: "/audio/finewinesandfinelines.mp3" },
  { title: "Feels Like Goodbye (Outro)", file: "/audio/feelslikegoodbyeoutro.mp3" },
  { title: "Deep Dive Podcast", file: "/audio/podcast.mp3" },
];

interface BottomAudioBarProps {
  isVisible: boolean;
}

const BottomAudioBar: React.FC<BottomAudioBarProps> = ({ isVisible }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number): string => {
    if (!seconds || !isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const loadTrack = (index: number): void => {
    if (index < 0) index = tracks.length - 1;
    if (index >= tracks.length) index = 0;
    
    setCurrentTrackIndex(index);
    
    if (audioRef.current) {
      audioRef.current.src = tracks[index].file;
      audioRef.current.load();
      
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  const togglePlay = (): void => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
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
    
    const updateTime = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      }
    };
    
    const handleEnd = () => {
      loadTrack(currentTrackIndex + 1);
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

  if (!isVisible) return null;

  return (
    <>
      <div className="bottom-audio-bar">
        <div className="audio-bar-content">
          {/* Left: Current Track Info */}
          <div className="track-info-section">
            <div className="track-details">
              <span className="track-title">{tracks[currentTrackIndex].title}</span>
              <span className="track-subtitle">A Novel Divorce Soundtrack</span>
            </div>
          </div>

          {/* Center: Controls */}
          <div className="controls-section">
            <div className="playback-controls">
              <button 
                className="control-btn" 
                onClick={() => loadTrack(currentTrackIndex - 1)}
              >
                <FontAwesomeIcon icon={faBackward} />
              </button>
              <button 
                className="control-btn play-btn" 
                onClick={togglePlay}
              >
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
              </button>
              <button 
                className="control-btn" 
                onClick={() => loadTrack(currentTrackIndex + 1)}
              >
                <FontAwesomeIcon icon={faForward} />
              </button>
            </div>
            
            <div className="progress-container">
              <span className="time">{formatTime(currentTime)}</span>
              <input
                type="range"
                className="progress-bar"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleSeek}
                min="0"
                max="100"
              />
              <span className="time">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right: Additional Controls */}
          <div className="extra-controls">
            <button 
              className="control-btn"
              onClick={() => setShowPlaylist(!showPlaylist)}
              title="Show Playlist"
            >
              <FontAwesomeIcon icon={faList} />
            </button>
          </div>
        </div>
      </div>

      {/* Playlist Popup */}
      {showPlaylist && (
        <div className="playlist-popup">
          <div className="playlist-header">
            <h3>Soundtrack</h3>
            <button 
              className="close-btn"
              onClick={() => setShowPlaylist(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="playlist-tracks">
            {tracks.map((track, index) => (
              <div
                key={index}
                className={`playlist-track ${index === currentTrackIndex ? "active" : ""}`}
                onClick={() => {
                  loadTrack(index);
                  setIsPlaying(true);
                }}
              >
                <span className="track-number">{index + 1}</span>
                <span className="track-name">{track.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <audio ref={audioRef} />
    </>
  );
};

export default BottomAudioBar;