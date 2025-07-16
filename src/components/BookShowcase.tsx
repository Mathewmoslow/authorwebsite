import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import "../styles/enhanced-book.css";
import "../styles/animations.css";
import PageTurner from "./PageTurner";
import ContactModal from "./ContactModal";
import bookCover from "../assets/images/IMG_1357.jpeg";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
const novelDivorceSnippet = "/audio/noveldivorcesnippet.mp3";

interface BookShowcaseProps {
  showAudioPlayer?: () => void;
}

const BookShowcase: React.FC<BookShowcaseProps> = () => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [showNotifyModal, setShowNotifyModal] = useState<boolean>(false);
  const [audioPlayer] = useState(() => new Audio(novelDivorceSnippet));
  
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
  
  const handleBuyNowClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setShowNotifyModal(true);
  };
  
  // Setup audio event listeners
  audioPlayer.addEventListener("ended", () => {
    setIsAudioPlaying(false);
  });
  
  return (
    <section
      ref={sectionRef}
      className="book-showcase section-padding full-width"
      id="novel-hero"
    >
      <div className="grid-container">
        <div className="grid-item-6 book-image animate-on-scroll">
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
          </div>
        </div>
        
        <div className="grid-item-6 book-details">
          <h1 className="book-title animate-on-scroll">A Novel Divorce</h1>
          <p className="book-tagline animate-on-scroll">
            A raw, unflinching memoir of love transforming, and self-discovery
          </p>
          
          <div className="book-description">
            <p className="animate-on-scroll">
              <i>A Novel Divorce</i> is the story of a life that doesn't so much fall
              apart as it unravels—slowly, privately, and with devastating
              precision.
            </p>
            <p className="animate-on-scroll">
              It begins in smoke-thick bars and borrowed beds, where love is a
              rumor and youth feels endless. Eventually, the noise is quieted by
              a wedding ring—or so it seems. But marriage doesn't erase chaos;
              it only mutes it. Mornings blur into hangovers, affection into
              obligation. By the time the divorce papers arrive, the loss is
              clear, final, and strangely lucid.
            </p>
            <p className="animate-on-scroll">
              But this isn't a memoir about collapse. It's about what happens
              next.
            </p>
            <p className="animate-on-scroll">
              In <i>A Novel Divorce</i>, the end of a marriage becomes a reckoning—and
              a beginning. When his relationship with Aaron reaches a point that
              is beyond repair, the narrator spirals through self-doubt, explores plant
              medicine, learns about spontaneous reinvention, develops outrageous friendships, builds courage in sobriety, and encounters one deeply unexpected love
              story that upends everything he thought he knew. From sexual
              fluidity and chosen family to ayahuasca trips and breakthroughs in therapy, this is a memoir about reassembling identity in the
              ruins of romance. It's about who we become between the last
              chapter of one love story and the first line of another—and the
              mess, humor, and heartbreaking clarity that carries us across.
            </p>
            <p className="animate-on-scroll">
              Unsentimental, quietly hopeful, and razor-sharp in its honesty,
              this is a story about how endings—when faced with eyes open—can
              become the most radical kind of beginning.
            </p>
          </div>
          
          <div className="book-actions animate-on-scroll">
            <a href="#" className="btn btn-primary" onClick={handleBuyNowClick}>
              Get Your Copy Now
            </a>
            
            <button onClick={handleAudioToggle} className="btn btn-primary listen-btn">
              <FontAwesomeIcon icon={isAudioPlaying ? faPause : faPlay} />
              <div className="btn-content">
                <span className="btn-title">Listen</span>
                <span className="btn-subtitle"><small>Audio Book Coming Soon</small></span>
              </div>
            </button>
            
            <button onClick={togglePreview} className="btn btn-secondary sample-btn">
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
          title="A Novel Divorce"
          bookType="novel-divorce"
          closePreview={togglePreview}
        />
      )}
      
      <ContactModal
        isOpen={showNotifyModal}
        onClose={() => setShowNotifyModal(false)}
        modalType="notify"
        bookTitle="A Novel Divorce"
      />
    </section>
  );
};

export default BookShowcase;