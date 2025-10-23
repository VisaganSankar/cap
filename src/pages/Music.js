import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Music = () => {
  const [selectedCategory, setSelectedCategory] = useState('calm');

  const playlists = {
    calm: { title: 'Calm' },
    motivational: { title: 'Motivational' },
    sleep: { title: 'Sleep Inducing' },
    nature: { title: 'Sounds of Nature' },
    binaural: { title: 'Binaural Beats' }
  };

  const getEmbedUrl = (categoryKey) => {
    switch(categoryKey) {
      case 'calm': return 'https://www.youtube.com/embed/8O-1qB-fxjc?autoplay=1&mute=1';
      case 'sleep': return 'https://www.youtube.com/embed/1ZYbU82GVz4?autoplay=1&mute=1';
      case 'nature': return 'https://www.youtube.com/embed/c2NmyoXBXmE?autoplay=1&mute=1';
      case 'motivational': return 'https://www.youtube.com/embed/videoseries?list=RDQMRt055t6Q8dQ&autoplay=1&mute=1';
      case 'binaural': return 'https://www.youtube.com/embed/1_G60OdEzXs?autoplay=1&mute=1';
      default: return 'https://www.youtube.com/embed/8O-1qB-fxjc?autoplay=1&mute=1';
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: '48px'}}>
          <h1 style={{fontSize: '48px', fontWeight: '700', marginBottom: '16px'}}>🎵 Music Therapy</h1>
          <p style={{fontSize: '18px', color: 'var(--muted)'}}>
            Choose from our curated collection of relaxing music and sounds
          </p>
        </div>

        {/* Category Buttons */}
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '32px'}}>
          {Object.entries(playlists).map(([key, playlist]) => (
            <button
              key={key}
              className={`btn ${selectedCategory === key ? 'btn-primary' : 'btn-outline'} small`}
              onClick={() => setSelectedCategory(key)}
              style={{margin: '4px'}}
            >
              {playlist.title}
            </button>
          ))}
        </div>

        {/* Current Playlist Title */}
        <div style={{textAlign: 'center', marginBottom: '24px'}}>
          <h2 style={{fontSize: '32px', fontWeight: '600', margin: 0}}>
            {playlists[selectedCategory].title} Playlist
          </h2>
        </div>

        {/* YouTube Embed */}
        <div style={{
          position: 'relative',
          paddingBottom: '56.25%',
          height: 0,
          overflow: 'hidden',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          marginBottom: '48px'
        }}>
          <iframe
            src={getEmbedUrl(selectedCategory)}
            title="YouTube video"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Category Descriptions */}
        <div className="cards" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '48px'}}>
          <div className="card" style={{padding: '24px'}}>
            <h3 style={{margin: '0 0 12px', color: 'var(--text)'}}>🎵 Calm</h3>
            <p style={{margin: 0, color: 'var(--muted)'}}>
              Gentle, soothing melodies designed to reduce stress and promote relaxation.
            </p>
          </div>
          
          <div className="card" style={{padding: '24px'}}>
            <h3 style={{margin: '0 0 12px', color: 'var(--text)'}}>💪 Motivational</h3>
            <p style={{margin: 0, color: 'var(--muted)'}}>
              Uplifting tracks to boost your mood and motivation throughout the day.
            </p>
          </div>
          
          <div className="card" style={{padding: '24px'}}>
            <h3 style={{margin: '0 0 12px', color: 'var(--text)'}}>😴 Sleep Inducing</h3>
            <p style={{margin: 0, color: 'var(--muted)'}}>
              Peaceful sounds and melodies to help you drift into restful sleep.
            </p>
          </div>
          
          <div className="card" style={{padding: '24px'}}>
            <h3 style={{margin: '0 0 12px', color: 'var(--text)'}}>🌿 Nature Sounds</h3>
            <p style={{margin: 0, color: 'var(--muted)'}}>
              Natural ambient sounds from forests, oceans, and peaceful environments.
            </p>
          </div>
          
          <div className="card" style={{padding: '24px'}}>
            <h3 style={{margin: '0 0 12px', color: 'var(--text)'}}>🧠 Binaural Beats</h3>
            <p style={{margin: 0, color: 'var(--muted)'}}>
              Scientific audio frequencies designed to influence brainwave patterns.
            </p>
          </div>
        </div>

        <div style={{textAlign: 'center', marginTop: '48px'}}>
          <Link to="/dashboard" className="btn btn-outline">← Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default Music;
