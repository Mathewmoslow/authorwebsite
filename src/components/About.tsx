import authorImage from "../assets/images/headshot.jpeg";
import "../styles/enhanced-about.css";
import "../styles/animations.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const About: React.FC = () => {
  const sectionRef = useScrollAnimation<HTMLElement>({
    perspective: 1000,
    rotation: 8,
  });

  return (
    <section
      ref={sectionRef}
      className="about section-padding full-width"
      id="about"
    >
      <div className="grid-container">
        <div className="grid-item-8 about-text">
          <h2 className="animate-on-scroll">About Mathew Moslow</h2>
          <p className="animate-on-scroll">
            Inside the layered world of a nursing student who builds like a
            designer, thinks like a researcher, and rests like someone who's
            earned it.
          </p>
          <p className="animate-on-scroll">
            By title, he's a nursing student — midway through an intense
            pre-licensure program, fluent in the language of vitals and patient
            care. But that's only the outer ring. Inside, there's a deeper
            structure: web interfaces that mimic human thought, audio-reactive
            learning tools, clinical questions rewritten with precision. His
            work doesn't just serve a curriculum — it interrogates the form
            itself.
          </p>
          <p className="animate-on-scroll">
            Research, for him, is not accumulation. It's architecture. Whether
            analyzing medical journals with methodical precision or mapping
            connections between seemingly unrelated disciplines, the impulse is
            the same: uncover patterns. Question assumptions. Build knowledge
            that reveals rather than obscures.
          </p>
          <p className="animate-on-scroll">
            His world is organized into concentric zones of comfort and control.
            The outer layer: cozy, communal, filled with blankets, dogs, and
            warmth. The inner sanctum: precise, quiet, hermetically his. He
            works with the intensity of someone who knows what it means to
            overextend — and who's learned to value the off-switch as much as
            the spark.
          </p>
          <p className="animate-on-scroll">
            That voice carries through his debut memoir, A Novel Divorce, now
            heading to press. It traces the end of his marriage and the long,
            layered life that led there. His second work, a novel with the
            working title Beyond the Reach of Justice, tells the story of a
            nurse disinherited by his father — and the quiet, calculated plot
            that unfolds in Jamaica, where a colonial-era law offers a lethal
            legal loophole.
          </p>
          <p className="animate-on-scroll">
            He is, in the quietest way possible, building a world he would
            actually want to live in.
          </p>
        </div>
        <div className="grid-item-4 about-image animate-on-scroll" style={{ padding: 0, overflow: "hidden" }}>
          <img
            src={authorImage}
            alt="Mathew Moslow Headshot"
            className="headshot"
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              display: "block"
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default About;