import React, { useState, useRef, useEffect } from "react";

// Import local audio files
import breathingAudio from "../assets/audio/breathing.mp3";
import flgbAudio from "../assets/audio/flgb.mp3";
import flgbSlowAudio from "../assets/audio/flgbslow.mp3";
import lovelyMessAudio from "../assets/audio/lovelymess.mp3";
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

interface MediaPlayerProps {
  isVisible: boolean;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ isVisible }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [minimized, setMinimized] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks: Track[] = [
    {
      title: "Feels Like Goodbye",
      file: flgbAudio,
      cover: flgbCover,
    },
    {
      title: "Feels Like Goodbye (Slow)",
      file: flgbSlowAudio,
      cover: flgbCover,
    },
    {
      title: "Lovely Mess",
      file: lovelyMessAudio,
      cover: lmCover,
    },
    {
      title: "Breathing",
      file: breathingAudio,
      cover: breathingCover,
    },
    {
      title: "Deep Dive (Podcast)",
      file: podcastAudio,
      cover: deepdiveCover,
    },
  ];

  const formatTime = (seconds: number): string => {
    if (!seconds || !isFinite(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const loadTrack = (index: number): void => {
    if (index < 0) index = tracks.length - 1;
    if (index >= tracks.length) index = 0;

    setCurrentTrackIndex(index);

    if (audioRef.current) {
      audioRef.current.src = tracks[index].file;
      audioRef.current.load();
      setIsLoaded(true);

      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const togglePlay = (): void => {
    if (!isLoaded) {
      loadTrack(currentTrackIndex);
    }

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

  return (
    <div
      className={`floating-player ${isVisible ? "visible" : ""} ${
        minimized ? "minimized" : ""
      }`}
    >
      <div className="player-header">
        <h4>Soundtrack to the Book</h4>
        <button
          className="minimize-btn"
          onClick={() => setMinimized(!minimized)}
        >
          <i className={`fas fa-${minimized ? "plus" : "minus"}`}></i>
        </button>
      </div>

      <div className={`player-body ${minimized ? "collapsed" : ""}`}>
        <div className="compact-controls">
          <div className="mini-cover">
            <img
              src={tracks[currentTrackIndex].cover}
              alt={`${tracks[currentTrackIndex].title} cover`}
            />
          </div>
          <div className="player-info">
            <div className="now-playing-compact">
              {tracks[currentTrackIndex].title}
            </div>
            <div className="control-buttons">
              <button className="float-control-btn" onClick={prevTrack}>
                <i className="fas fa-backward"></i>
              </button>
              <button className="float-play-btn" onClick={togglePlay}>
                <i className={`fas fa-${isPlaying ? "pause" : "play"}`}></i>
              </button>
              <button className="float-control-btn" onClick={nextTrack}>
                <i className="fas fa-forward"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="progress-container-float">
          <input
            type="range"
            className="progress-track"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            min="0"
            max="100"
          />
          <div className="time-display-float">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        <div className="track-list-float">
          {tracks.map((track, index) => (
            <div
              key={index}
              className={`track-float ${
                index === currentTrackIndex ? "active" : ""
              }`}
              onClick={() => {
                loadTrack(index);
                setIsPlaying(true);
              }}
            >
              <span className="track-number">{index + 1}</span>
              <span className="track-title">{track.title}</span>
            </div>
          ))}
        </div>
      </div>

      <audio ref={audioRef}>
        {/* Only add source when track is loaded */}
        {isLoaded && (
          <source src={tracks[currentTrackIndex].file} type="audio/mpeg" />
        )}
      </audio>
    </div>
  );
};

export default MediaPlayer;
