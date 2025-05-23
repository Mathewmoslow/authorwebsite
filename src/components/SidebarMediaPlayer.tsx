import React, { useState, useRef, useEffect } from "react";

// Import local audio files
import flgbAudio from "../assets/audio/flgb.mp3";
import flgbSlowAudio from "../assets/audio/flgbslow.mp3";
import lovelyMessAudio from "../assets/audio/lovelymess.mp3";
import breathingAudio from "../assets/audio/breathing.mp3";
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

  // Filter out tracks with missing audio files
  const tracks: Track[] = [
    flgbAudio && {
      title: "Feels Like Goodbye",
      file: flgbAudio,
      cover: flgbCover,
    },
    flgbSlowAudio && {
      title: "Feels Like Goodbye (Slow)",
      file: flgbSlowAudio,
      cover: flgbCover,
    },
    lovelyMessAudio && {
      title: "Lovely Mess",
      file: lovelyMessAudio,
      cover: lmCover,
    },
    breathingAudio && {
      title: "Breathing",
      file: breathingAudio,
      cover: breathingCover,
    },
    podcastAudio && {
      title: "Deep Dive (Podcast)",
      file: podcastAudio,
      cover: deepdiveCover,
    },
  ].filter(Boolean) as Track[];

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

    if (audioRef.current && tracks[index]?.file) {
      audioRef.current.src = tracks[index].file;
      audioRef.current.load();
      setIsLoaded(true);

      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  const togglePlay = (): void => {
    if (tracks.length === 0) return;

    if (!isLoaded) {
      loadTrack(currentTrackIndex);
    }

    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(console.error);
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

  return (
    <div
      className={`sidebar-player ${isVisible ? "visible" : ""} ${
        isExpanded ? "expanded" : ""
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Collapsed State */}
      <div className="sidebar-collapsed">
        <div className="sidebar-tab" onClick={() => setIsExpanded(!isExpanded)}>
          <i className="fas fa-music"></i>
          <span className="tab-text">SOUNDTRACK</span>
        </div>

        <div className="mini-controls">
          <button className="sidebar-play-btn" onClick={togglePlay}>
            <i className={`fas fa-${isPlaying ? "pause" : "play"}`}></i>
          </button>
        </div>

        <div className="current-track-mini">
          <img
            src={tracks[currentTrackIndex]?.cover}
            alt="Current track"
            className="mini-cover-img"
          />
        </div>
      </div>

      {/* Expanded State */}
      <div className="sidebar-expanded">
        <div className="sidebar-header">
          <h4>Soundtrack to the Book</h4>
          <button className="collapse-btn" onClick={() => setIsExpanded(false)}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="current-track-display">
          <img
            src={tracks[currentTrackIndex]?.cover}
            alt={`${tracks[currentTrackIndex]?.title} cover`}
            className="track-cover-large"
          />
          <div className="track-info">
            <h5 className="track-title">{tracks[currentTrackIndex]?.title}</h5>
          </div>
        </div>

        <div className="player-controls">
          <button className="control-btn" onClick={prevTrack}>
            <i className="fas fa-backward"></i>
          </button>
          <button className="control-btn play-btn" onClick={togglePlay}>
            <i className={`fas fa-${isPlaying ? "pause" : "play"}`}></i>
          </button>
          <button className="control-btn" onClick={nextTrack}>
            <i className="fas fa-forward"></i>
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
        {isLoaded && tracks[currentTrackIndex]?.file && (
          <source src={tracks[currentTrackIndex].file} type="audio/mpeg" />
        )}
      </audio>
    </div>
  );
};

export default SidebarMediaPlayer;
