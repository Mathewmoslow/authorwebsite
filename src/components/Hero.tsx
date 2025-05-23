import heroImage from "../styles/header.jpeg";

const Hero: React.FC = () => {
  return (
    <section
      className="hero full-width"
      id="hero-section"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay">
        <div className="hero-content-wrapper">
          <h1 id="hero-title">Mathew Moslow</h1>
          <p className="hero-subtitle">I nurse. I research. I write stories.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
