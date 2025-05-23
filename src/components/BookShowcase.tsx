import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAmazon, faApple } from "@fortawesome/free-brands-svg-icons";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import PageTurner from "./PageTurner";
import AudioPreview from "./AudioPreview";
import bookCover from "../assets/images/IMG_1357.jpeg";

interface BookShowcaseProps {
  showAudioPlayer?: () => void;
}

const BookShowcase: React.FC<BookShowcaseProps> = () => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const togglePreview = (): void => {
    setShowPreview(!showPreview);
  };

  const handleCoverClick = (): void => {
    setShowPreview(true);
  };

  const handleAudioPreview = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <section
      className="book-showcase section-padding full-width"
      id="novel-hero"
    >
      <div className="grid-container">
        <div className="grid-item-6 book-image">
          <div
            className="book-display clickable-cover"
            onClick={handleCoverClick}
            title="Click to read preview"
          >
            <img
              src={bookCover}
              alt="A Novel Divorce Cover"
              className="book-cover"
            />
            <div className="book-shadow"></div>
            <div className="cover-overlay">
              <i className="fas fa-book-open"></i>
              <span>Click to Preview</span>
            </div>
          </div>
        </div>
        <div className="grid-item-6 book-details">
          <h1 className="book-title">A Novel Divorce</h1>
          <p className="book-tagline">
            A raw, unflinching memoir of love, betrayal, and self-discovery
          </p>
          <div className="book-description">
            <p>
              This isn't just a breakup story. It's what happens when love
              disfigures—when a relationship collapses under the weight of
              desire, and everything left unsaid.
            </p>
            <p>
              At its center: a descent. Nights that unravel into hallucination,
              encounters that erase more than they fulfill, and rumors too
              disturbing to speak aloud. A prison. A brush with death. A truth
              that refuses to behave.
            </p>
            <p>
              A Novel Divorce is a story of survival. Written with razor-wire
              honesty and noir clarity, this is the tale of two lovers scorched
              by the same fire, emerging not as what they once were, but as
              something new. Not reunited, but redefined.
            </p>
            <p>
              What remains once the flames cool and the charred debris can be
              sifted through isn't romance, it's pure reckoning—and from it, we
              get a Novel kind of relationship.
            </p>
          </div>

          <AudioPreview
            bookType="novel-divorce"
            isPlaying={isAudioPlaying}
            onPlayStateChange={setIsAudioPlaying}
          />

          <div className="book-actions">
            <a href="#" className="btn btn-primary">
              Buy Now
            </a>
            <button onClick={togglePreview} className="btn btn-secondary">
              Read Preview
            </button>
            <a
              href="#"
              className="btn btn-tertiary"
              onClick={handleAudioPreview}
            >
              <FontAwesomeIcon icon={faHeadphones} />
              {isAudioPlaying ? "Stop" : "Listen to"} Preview
            </a>
          </div>
          <div className="book-retailers">
            <span>Available at:</span>
            <a href="#" className="retailer-link" title="Amazon">
              <FontAwesomeIcon icon={faAmazon} />
            </a>
            <a href="#" className="retailer-link" title="Apple Books">
              <FontAwesomeIcon icon={faApple} />
            </a>
            <a href="#" className="retailer-link" title="Barnes & Noble">
              <i className="fas fa-book"></i>
            </a>
            <a href="#" className="retailer-link" title="Kobo">
              <i className="fas fa-tablet-alt"></i>
            </a>
          </div>
        </div>
      </div>

      {showPreview && (
        <PageTurner
          title="A Novel Divorce"
          bookType="novel-divorce"
          closePreview={togglePreview}
        />
      )}
    </section>
  );
};

export default BookShowcase;
