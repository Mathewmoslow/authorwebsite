import React from "react";
import "./Footer.css"; // Add this import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faInstagram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="full-width">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>Mathew Moslow</h3>
            <p className="tagline">Author & Research Enthusiast</p>
          </div>

          <div className="footer-links">
            <ul>
              <li>
                <a href="#hero-section">Home</a>
              </li>
              <li>
                <a href="#novel-hero">Books</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li><a href="#research">Research</a></li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-social">
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>

        <div className="copyright">
          <p>&copy; {currentYear} Mathew Moslow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;