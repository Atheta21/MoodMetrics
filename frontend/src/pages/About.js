import React from "react";

function About() {
  return (
    <div className="about-page">
      <div className="about-card">
        <h1>About MoodMetrics</h1>

        <p>
          MoodMetrics is a mental wellness web application designed to help
          individuals understand their emotional state in a simple,
          interactive, and engaging way.
        </p>

        <p>
          Inspired by clinically validated screening approaches, this platform
          provides a structured mood assessment that helps users identify where
          they stand on the mental health spectrum.
        </p>

        <p>
          Our goal is not to diagnose, but to promote awareness, encourage
          self-reflection, and create a safe digital space where mental health
          conversations feel approachable and stigma-free.
        </p>

        <div className="highlight-box">
           Early awareness leads to early support.
        </div>
      </div>
    </div>
  );
}

export default About;