import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faChevronRight,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

// Import local audio files
import feelsLikeGoodbyeAudio from "../assets/audio/Feels Like Goodbye.mp3";
import lovelyMessAudio from "../assets/audio/Lovely Mess.mp3";
import whileImBreathingAudio from "../assets/audio/While Im Breathing.mp3";
import feelsLikeGoodbyeOutroAudio from "../assets/audio/Feels Like Goodbye (Outro).mp3";
import podcastAudio from "../assets/audio/Podcast_A Novel Divorce.wav";

// Import local cover images
import flgbCover from "../assets/images/flgb2.jpeg";
import lmCover from "../assets/images/LMCOVER2.png";
import breathingCover from "../assets/images/breathing2.jpeg";
import deepdiveCover from "../assets/images/deepdive.png";

interface Track {
  title: string;
  file: string;
  cover: string;
}

interface SidebarMediaPlayerProps {
  isVisible: boolean;
}

const SidebarMediaPlayer: React.FC<SidebarMediaPlayerProps> = ({
  isVisible,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Create tracks array with proper type safety
  const createTrack = (
    audioFile: string | undefined,
    title: string,
    coverImage: string
  ): Track | null => {
    return audioFile ? { title, file: audioFile, cover: coverImage } : null;
  };

  // Filter out tracks with missing audio files
  const tracks: Track[] = [
    createTrack(feelsLikeGoodbyeAudio, "Feels Like Goodbye", flgbCover),
    createTrack(lovelyMessAudio, "Lovely Mess", lmCover),
    createTrack(whileImBreathingAudio, "While I'm Breathing", breathingCover),
    createTrack(
      feelsLikeGoodbyeOutroAudio,
      "Feels Like Goodbye (Outro)",
      flgbCover
    ),
    createTrack(podcastAudio, "Deep Dive (Podcast)", deepdiveCover),
  ].filter((track): track is Track => track !== null);

  const formatTime = (seconds: number): string => {
    if (!seconds || !isFinite(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
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

  // Don't render if no tracks available
  if (tracks.length === 0) {
    return null;
  }

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  return (
    <div
      className={`sidebar-player ${isVisible ? "visible" : ""} ${
        isExpanded ? "expanded" : ""
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{ top: "100px" }}
    >
      {/* Collapsed State */}
      <div className="sidebar-collapsed">
        <div className="sidebar-tab" onClick={() => setIsExpanded(!isExpanded)}>
          <FontAwesomeIcon icon={faMusic} />
          <span className="tab-text">SOUNDTRACK</span>
        </div>

        <div className="mini-controls">
          <button className="sidebar-play-btn" onClick={togglePlay}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
        </div>

        <div className="current-track-mini">
          {currentTrack && (
            <img
              src={currentTrack.cover}
              alt="Current track"
              className="mini-cover-img"
            />
          )}
        </div>
      </div>

      {/* Expanded State */}
      <div className="sidebar-expanded">
        <div className="sidebar-header">
          <h4>Soundtrack to the Book</h4>
          <button className="collapse-btn" onClick={() => setIsExpanded(false)}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <div className="current-track-display">
          {currentTrack && (
            <>
              <img
                src={currentTrack.cover}
                alt={`${currentTrack.title} cover`}
                className="track-cover-large"
              />
              <div className="track-info">
                <h5 className="track-title">{currentTrack.title}</h5>
              </div>
            </>
          )}
        </div>

        <div className="player-controls">
          <button
            className="control-btn"
            onClick={prevTrack}
            title="Previous Track"
          >
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button
            className="control-btn play-btn"
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play"}
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button
            className="control-btn"
            onClick={nextTrack}
            title="Next Track"
          >
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>

        <div className="progress-section">
          <input
            type="range"
            className="progress-bar"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            min="0"
            max="100"
          />
          <div className="time-info">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        <div className="track-list">
          {tracks.map((track, index) => (
            <div
              key={index}
              className={`track-item ${
                index === currentTrackIndex ? "active" : ""
              }`}
              onClick={() => {
                loadTrack(index);
                setIsPlaying(true);
              }}
            >
              <span className="track-num">{index + 1}</span>
              <span className="track-name">{track.title}</span>
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
};

export default SidebarMediaPlayer;
