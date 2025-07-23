import React from "react";
import headshotImage from "../assets/images/headshot.jpeg";
import "./About.css";

const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-content">
            <h2>About Mathew Moslow</h2>
            <p>
              Nursing student. Systems critic. Reluctant vampire. Somewhere between crying at commercials and building apps at 3am, you'll find an author who can't help but see the cracks in everything - and can't stop trying to fix them.
            </p>
            <p>
              By day (when he manages to see it), he's halfway through a pre-licensure nursing program, learning the careful choreography of codes and the weight of a frightened wife's hand in his. By night, he's building tools that solve the problems nobody else seems to notice: syllabus chaos, systemic educational failures, the gap between what nursing school teaches and what the floor demands.
            </p>
            <p>
              He once smuggled a wounded bird home in his pocket, forgot about it for days, and learned something about good intentions. Now he approaches psychiatric nursing with the same instinct - equal parts bleeding heart and pragmatic selfishness, knowing that caring for others requires a certain ruthlessness about self-preservation.
            </p>
            <p>
              His workspace isn't an altar and his sleep schedule isn't a virtue. He crashes when he must, builds when he can't stop himself, and measures success not in perfect routines but in problems solved and systems exposed. The bigger the issue - postpartum depression, educational paradigms, the way we fail those who need us most - the more likely he is to mutter "I'm going to fix it though, don't worry."
            </p>
            <p>
              What emerges isn't the story of someone who has it figured out, but someone who keeps picking himself up, driven by curiosity and the stubborn belief that things could work better than they do.
            </p>
          </div>
          <div className="about-image">
            <img src={headshotImage} alt="Mathew Moslow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;