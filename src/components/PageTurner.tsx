import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// Import Novel Divorce pages
import novelDivorcePage1 from "../assets/images/book-pages/novel-divorce/page-1.jpg";
import novelDivorcePage2 from "../assets/images/book-pages/novel-divorce/page-2.jpg";
import novelDivorcePage3 from "../assets/images/book-pages/novel-divorce/page-3.jpg";

// Import Year and a Day pages
import yearAndDayPage1 from "../assets/images/book-pages/year-and-day/page-1.jpg";
import yearAndDayPage2 from "../assets/images/book-pages/year-and-day/page-2.jpg";
import yearAndDayPage3 from "../assets/images/book-pages/year-and-day/page-3.jpg";

interface PageTurnerProps {
  title: string;
  bookType: "novel-divorce" | "year-and-day";
  closePreview: () => void;
}

const PageTurner: React.FC<PageTurnerProps> = ({
  title,
  bookType,
  closePreview,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

  // Define pages for each book
  const bookPages = {
    "novel-divorce": [novelDivorcePage1, novelDivorcePage2, novelDivorcePage3],
    "year-and-day": [yearAndDayPage1, yearAndDayPage2, yearAndDayPage3],
  };

  const pages = bookPages[bookType];

  const handlePrevPage = (): void => {
    if (currentPage > 0) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const handleNextPage = (): void => {
    if (currentPage < pages.length - 1) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  return (
    <div className="book-preview-overlay open">
      <div className="page-turner-container">
        <button className="close-button" onClick={closePreview}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="page-turner-header">
          <h3>{title}</h3>
          <div className="page-indicator">
            Page <span>{currentPage + 1}</span> of <span>{pages.length}</span>
          </div>
        </div>

        <div className="page-turner-content">
          <button
            className="page-button prev"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <div className="page-display">
            <img
              src={pages[currentPage]}
              alt={`${title} - Page ${currentPage + 1}`}
              className={`page-image ${isFlipping ? "flipping" : ""}`}
            />
          </div>

          <button
            className="page-button next"
            onClick={handleNextPage}
            disabled={currentPage === pages.length - 1}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <div className="page-turner-footer">
          <div className="page-dots">
            {pages.map((_, index) => (
              <button
                key={index}
                className={`page-dot ${index === currentPage ? "active" : ""}`}
                onClick={() => {
                  setIsFlipping(true);
                  setTimeout(() => {
                    setCurrentPage(index);
                    setIsFlipping(false);
                  }, 300);
                }}
              />
            ))}
          </div>
          <div className="footer-actions">
            <button className="btn btn-secondary" onClick={closePreview}>
              Close Preview
            </button>
            <a href="#" className="btn btn-primary">
              Get the Full Book
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTurner;
