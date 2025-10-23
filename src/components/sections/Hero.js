import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero section" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="title">SOOTHESCAPE</h1>
          <p className="subtitle">"Mental Health is a right not a privilege"</p>
          <div className="hero-cta">
            <Link className="btn btn-primary" to="/login">Get Started</Link>
            <a className="btn btn-ghost" href="#problem">Learn More</a>
          </div>
        </div>
        <div className="hero-media">
          <div className="glass card-stats">
            <div>
              <h3>Non‑invasive</h3>
              <p>GSR + HR sensor fusion</p>
            </div>
            <div>
              <h3>Realtime</h3>
              <p>Edge + Cloud ready</p>
            </div>
            <div>
              <h3>Biofeedback</h3>
              <p>Therapeutic audio loops</p>
            </div>
          </div>
          <img className="hero-illustration" src="/image1.jpg" alt="Stress detection illustration" />
        </div>
      </div>
      <div className="bg-shape"></div>
    </section>
  );
};

export default Hero;
