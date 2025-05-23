import { useState, useEffect } from "react";
import "./NavBar.css";

interface NavBarProps {
  onListenClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onListenClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Adjust for nav bar height
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`site-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="logo">
          <a href="#" onClick={() => scrollToSection("hero-section")}>
            Mathew Moslow
          </a>
        </div>
        <ul className={`nav-links ${mobileMenuOpen ? "nav-open" : ""}`}>
          <li>
            <a href="#" onClick={() => scrollToSection("hero-section")}>
              Home
            </a>
          </li>
          <li>
            <a href="#" onClick={() => scrollToSection("novel-section")}>
              A Novel Divorce
            </a>
          </li>
          <li>
            <a href="#" onClick={() => scrollToSection("about-section")}>
              About
            </a>
          </li>
          <li>
            <a href="#" onClick={() => scrollToSection("second-novel")}>
              Upcoming
            </a>
          </li>
          <li>
            <a
              href="#"
              className="listen-now-btn"
              onClick={(e) => {
                e.preventDefault();
                onListenClick();
              }}
            >
              Listen Now
            </a>
          </li>
        </ul>
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`fas fa-${mobileMenuOpen ? "times" : "bars"}`}></i>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
