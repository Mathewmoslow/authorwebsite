import { useState } from "react";
import PageTurner from "./PageTurner";
import AudioPreview from "./AudioPreview";
import novelCover from "../assets/images/ayad.png";

const SecondNovel: React.FC = () => {
  console.log("SecondNovel component rendering!");

  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const togglePreview = (): void => {
    setShowPreview(!showPreview);
  };

  const handleCoverClick = (): void => {
    setShowPreview(true);
  };

  const handleAudioPreview = (): void => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <section
      className="second-novel section-padding full-width"
      id="second-novel"
    >
      <div className="grid-container">
        <div className="grid-item-4 book-image">
          <div
            className="book-display clickable-cover"
            onClick={handleCoverClick}
            title="Click to read preview"
          >
            <img
              src={novelCover}
              alt="A Year and a Day Cover"
              className="book-cover"
            />
            <div className="book-shadow"></div>
            <div className="cover-overlay">
              <i className="fas fa-book-open"></i>
              <span>Click to Preview</span>
            </div>
          </div>
        </div>

        <div className="grid-item-8 book-details">
          <h2>A Year and a Day</h2>
          <h3 style={{ fontStyle: "italic", color: "var(--accent-red)" }}>
            Beyond the Reach of Justice
          </h3>

          <div className="book-description">
            <p>
              "There are two places where justice cannot follow: beyond the
              grave and beyond the horizon. Jonathon Blake found a third: the
              space between law and morality."
            </p>

            <p>
              In the lush coastal beauty of Jamaica, where colonial history
              casts long shadows over modern lives, nurse Jonathan Blake harbors
              a wound that refuses to heal. When his mother dies of an overdose
              after a bitter divorce, Jonathan blames his father and sets into
              motion a plan that manipulates colonial-era legal loopholes to
              exact revenge—before the clock runs out.
            </p>
          </div>

          <AudioPreview
            bookType="year-and-day"
            isPlaying={isAudioPlaying}
            onPlayStateChange={setIsAudioPlaying}
          />

          <div className="book-actions">
            <a href="#" className="btn btn-primary">
              Sign up to get notified
            </a>
            <button onClick={togglePreview} className="btn btn-secondary">
              Sneak Peek
            </button>
            <button onClick={handleAudioPreview} className="btn btn-tertiary">
              <i className="fas fa-headphones"></i>
              {isAudioPlaying ? "Stop" : "Listen to"} Preview
            </button>
          </div>
        </div>
      </div>

      {showPreview && (
        <PageTurner
          title="A Year and a Day"
          bookType="year-and-day"
          closePreview={togglePreview}
        />
      )}
    </section>
  );
};

export default SecondNovel;
