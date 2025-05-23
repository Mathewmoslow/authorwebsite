import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface BookPreviewProps {
  title: string;
  pages: string[];
  closePreview: () => void;
}

const BookPreview: React.FC<BookPreviewProps> = ({
  title,
  pages,
  closePreview,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

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
      <div className="book-preview-container">
        <button className="close-button" onClick={closePreview}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="book-preview-header">
          <h3>{title}</h3>
          <div className="page-indicator">
            Page <span id="current-page">{currentPage + 1}</span> of{" "}
            <span id="total-pages">{pages.length}</span>
          </div>
        </div>

        <div className="book-preview-content">
          <button
            className="page-button prev"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <div
            className={`page-content ${isFlipping ? "flipping" : ""}`}
            dangerouslySetInnerHTML={{ __html: pages[currentPage] }}
          />

          <button
            className="page-button next"
            onClick={handleNextPage}
            disabled={currentPage === pages.length - 1}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <div className="book-preview-footer">
          <button className="btn btn-secondary" onClick={closePreview}>
            Close Preview
          </button>
          <a href="#" className="btn btn-primary">
            Get the Full Book
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookPreview;
