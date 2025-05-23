import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Change nav background on scroll
  useEffect(() => {
    const handleScroll = (): void => {
      const nav = document.querySelector(".main-nav");
      if (window.scrollY > 50) {
        if (nav) {
          nav.setAttribute(
            "style",
            "background: rgba(46, 46, 46, 0.95); position: fixed; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);"
          );
        }
      } else {
        if (nav) {
          nav.setAttribute(
            "style",
            "background: rgba(46, 46, 46, 0.5); position: absolute; box-shadow: none;"
          );
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle menu toggle
  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking a link
  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="logo">
          <a href="#hero-section">Mathew Moslow</a>
        </div>
        <div
          className={`menu-toggle ${isMenuOpen ? "is-active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <a href="#hero-section" className="nav-link" onClick={closeMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="#novel-hero" className="nav-link" onClick={closeMenu}>
              A Novel Divorce
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link" onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a href="#second-novel" className="nav-link" onClick={closeMenu}>
              Upcoming
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link cta js-audio-trigger"
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
              }}
            >
              Listen Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
