import React from 'react';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <section id="features" className="section">
      <div className="container two-col">
        <div className="media">
          <img src="/image3.jpg" alt="Features" style={{maxWidth: '400px', height: 'auto', margin: '0 auto', display: 'block'}} />
        </div>
        <div className="content">
          <h2>Key Features</h2>
          <div className="feature-buttons">
            <Link className="btn btn-outline small" to="/music">🎵 Music</Link>
            <Link className="btn btn-outline small" to="/chatbot">🤖 Aimee the chat bot</Link>
            <Link className="btn btn-outline small" to="/meditation-yoga">🧘 Meditation / Yoga</Link>
            <Link className="btn btn-outline small" to="/relaxation-exercises">💆 Relaxation Exercises</Link>
            <Link className="btn btn-outline small" to="/meet-counselor">👨‍⚕️ Meet a Counselor</Link>
          </div>
          <Link className="btn btn-primary" to="/dashboard">Open Dashboard</Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
