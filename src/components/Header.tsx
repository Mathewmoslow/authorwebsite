import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Change nav background on scroll
  useEffect(() => {
    const nav = document.querySelector(".main-nav");

    const handleScroll = (): void => {
      if (!nav) return;

      const scrollY = window.scrollY;

      if (scrollY === 0) {
        nav.classList.remove("scrolled");
        nav.setAttribute(
          "style",
          "background: transparent; position: absolute; box-shadow: none;"
        );
      } else if (scrollY > 0 && scrollY <= 50) {
        nav.classList.add("scrolled");
        nav.setAttribute(
          "style",
          "background: rgba(139, 0, 0, 0.6); position: fixed; box-shadow: none;"
        );
      } else {
        nav.classList.add("scrolled");
        nav.setAttribute(
          "style",
          "background: rgba(139, 0, 0, 1); position: fixed; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);"
        );
      }
    };

    // Run once on initial load
    handleScroll();

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
          <a href="#hero-section" style={{ color: "white" }}>
            Mathew Moslow
          </a>
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
            <a href="#research" className="nav-link" onClick={closeMenu}>
              Research
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;