import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAmazon, faApple } from "@fortawesome/free-brands-svg-icons";
import "../styles/enhanced-book.css";
import "../styles/animations.css";
import PageTurner from "./PageTurner";
import AudioPreview from "./AudioPreview";
import ContactModal from "./ContactModal";
import bookCover from "../assets/images/IMG_1357.jpeg";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const BookShowcase: React.FC = () => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [showNotifyModal, setShowNotifyModal] = useState<boolean>(false);

  const sectionRef = useScrollAnimation<HTMLElement>({
    perspective: 1200,
    rotation: 10,
  });

  const togglePreview = (): void => {
    setShowPreview(!showPreview);
  };

  const handleBuyNowClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setShowNotifyModal(true);
  };

  return (
    <section
      ref={sectionRef}
      className="book-showcase section-padding full-width"
      id="novel-hero"
    >
      <div className="grid-container">
        <div className="grid-item-6 book-image animate-on-scroll">
          <div className="book-display">
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
              A Novel Divorce is the story of a life that doesn't so much fall
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
              What follows is a meticulous rebuild: therapy, sobriety, and an
              unexpected friendship between two people who refuse to let their
              shared past become a battlefield. With grace and candor, A Novel
              Divorce charts how failure—when met without self-pity—can make
              room for something more durable. Not redemption, exactly, but a
              quieter kind of truth. A self reclaimed. A bond reshaped.
            </p>
            <p className="animate-on-scroll">
              Unsentimental, quietly hopeful, and razor-sharp in its honesty,
              this is a story about how endings—when faced with eyes open—can
              become the most radical kind of beginning.
            </p>
          </div>

          <AudioPreview
            bookType="novel-divorce"
            isPlaying={isAudioPlaying}
            onPlayStateChange={setIsAudioPlaying}
          />

          <div className="book-actions animate-on-scroll">
            <a href="#" className="btn btn-primary" onClick={handleBuyNowClick}>
              Notify Me
            </a>
            <button onClick={togglePreview} className="btn btn-secondary">
              Read Preview
            </button>
          </div>
          <div className="book-retailers animate-on-scroll">
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
