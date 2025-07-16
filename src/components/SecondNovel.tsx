import { useState } from "react";
import PageTurner from "./PageTurner";
import ContactModal from "./ContactModal";
import novelCover from "../assets/images/ayad.png";
import "../styles/enhanced-book.css";
import "../styles/animations.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faBookOpen } from "@fortawesome/free-solid-svg-icons";
const blakeHallSnippet = "/audio/blakehall.mp3";

const SecondNovel: React.FC = () => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [audioPlayer] = useState(() => new Audio(blakeHallSnippet));

  const sectionRef = useScrollAnimation<HTMLElement>({
    perspective: 1200,
    rotation: 10,
  });

  const togglePreview = (): void => {
    setShowPreview(!showPreview);
  };

  const handleCoverClick = (): void => {
    setShowPreview(true);
  };

  const handleAudioToggle = (): void => {
    if (isAudioPlaying) {
      audioPlayer.pause();
      setIsAudioPlaying(false);
    } else {
      audioPlayer.play();
      setIsAudioPlaying(true);
    }
  };

  const handleReserveClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setShowContactModal(true);
  };

  // Setup audio event listeners
  audioPlayer.addEventListener("ended", () => {
    setIsAudioPlaying(false);
  });

  return (
    <section
      ref={sectionRef}
      className="second-novel section-padding full-width"
      id="second-novel"
    >
      <div className="grid-container">
        <div className="grid-item-4 book-image animate-on-scroll">
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
          </div>
        </div>
        <div className="grid-item-8 book-details">
          <h2 className="animate-on-scroll">A Year and a Day</h2>
          <h3
            className="animate-on-scroll"
            style={{ fontStyle: "italic", color: "var(--accent-red)" }}
          >
            Beyond the Reach of Justice
          </h3>
          <div className="book-description">
            <p className="animate-on-scroll">
              "There are two places where justice cannot follow: beyond the
              grave and beyond the horizon. Jonathon Blake found a third: the
              space between law and morality."
            </p>
            <p className="animate-on-scroll">
              In the lush coastal beauty of Jamaica, where colonial history
              casts long shadows over modern lives, nurse Jonathan Blake harbors
              a wound that refuses to heal. When his mother dies of an overdose
              after a bitter divorce, Jonathan blames his father and sets into
              motion a plan that manipulates colonial-era legal loopholes to
              exact revenge—before the clock runs out.
            </p>
          </div>
          
          <div className="book-actions animate-on-scroll">
            <a href="#" className="btn btn-primary" onClick={handleReserveClick}>
              Reserve Your Copy
            </a>
            <button onClick={handleAudioToggle} className="btn btn-secondary listen-btn">
              <FontAwesomeIcon icon={isAudioPlaying ? faPause : faPlay} />
              <div className="btn-content">
                <span className="btn-title">Listen</span>
                <span className="btn-subtitle"><small>Audio Book Coming Soon</small></span>
              </div>
            </button>
            <button onClick={togglePreview} className="btn btn-tertiary">
              <FontAwesomeIcon icon={faBookOpen} />
              <span>Sample</span>
            </button>
          </div>
          
          <div className="book-availability animate-on-scroll">
            <p style={{ marginTop: "1.5rem", fontSize: "0.95rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
              Also available in Softcover and Digital format from all your favorite retailers!
            </p>
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
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        modalType="notify"
        bookTitle="A Year and a Day"
      />
    </section>
  );
};

export default SecondNovel;