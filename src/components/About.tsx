import React, { useEffect, useRef } from "react";
import headshotImage from "../assets/images/headshot.jpeg";
import "./About.css";

const About: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current || !sectionRef.current) return;

      // Get the section's position relative to viewport
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate if section is in view
      if (sectionTop <= windowHeight && sectionTop + sectionHeight >= 0) {
        // Calculate scroll progress through the section (0 to 1)
        const scrollProgress = Math.max(0, Math.min(1, -sectionTop / (sectionHeight - windowHeight)));

        // Apply parallax transform - adjust the multiplier to control speed
        const translateY = scrollProgress * 300; // Adjust this value to control parallax speed
        contentRef.current.style.transform = `translateY(-${translateY}px)`;
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="split-container">
        <div className="content-side">
          <div className="accent-line"></div>
          <div className="content-wrapper" ref={contentRef}>
            <h2>About Mathew Moslow</h2>
            <p>
              Inside the layered world of a nursing student who builds like a designer, thinks like a researcher, and rests like someone who's earned it.
            </p>
            <p>
              By title, he's a nursing student — midway through an intense pre-licensure program, fluent in the language of vitals and patient care. But that's only the outer ring. Inside, there's a deeper structure: web interfaces that mimic human thought, audio-reactive learning tools, clinical questions rewritten with precision. His work doesn't just serve a curriculum — it interrogates the form itself.
            </p>
            <p>
              Research, for him, is not accumulation, it's architecture. Whether analyzing medical journals with methodical precision or mapping connections between seemingly unrelated disciplines, the impulse is the same: uncover patterns. Question assumptions. Build knowledge that reveals rather than obscures.
            </p>
            <p>
              His world is organized into concentric zones of comfort and control. The outer layer: cozy, communal, filled with blankets, dogs, and warmth. The inner sanctum: precise, quiet, hermetically his. He works with the intensity of someone who knows what it means to overextend — and who's learned to value the off-switch as much as the spark.
            </p>
            <p>
              That voice carries through his debut memoir, A Novel Divorce, now heading to press. It traces the end of his marriage and the long, layered life that led there. His second work, a novel with the working title Beyond the Reach of Justice, tells the story of a nurse disenchanted by his father — and the quiet, calculated plot that unfolds in Jamaica, where a colonial-era law offers a lethal legal loophole.
            </p>
            <p>
              He is, in the quietest way possible, building a world he would actually want to live in.
            </p>
          </div>
        </div>
        <div className="image-side">
          <div className="image-wrapper">
            <div className="image-overlay"></div>
            <img src={headshotImage} alt="Mathew Moslow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;