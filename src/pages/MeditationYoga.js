import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MeditationYoga = () => {
  const [selectedCategory, setSelectedCategory] = useState('meditation');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState(null);

  const content = {
    meditation: {
      title: 'Meditation Practices',
      items: [
        {
          title: '5-Minute Breathing Meditation',
          description: 'A quick breathing exercise to center yourself',
          duration: '5 min',
          type: 'guided'
        },
        {
          title: 'Body Scan Meditation',
          description: 'Progressive relaxation through body awareness',
          duration: '15 min',
          type: 'guided'
        },
        {
          title: 'Mindfulness Meditation',
          description: 'Present moment awareness practice',
          duration: '10 min',
          type: 'guided'
        },
        {
          title: 'Loving-Kindness Meditation',
          description: 'Cultivating compassion and positive emotions',
          duration: '20 min',
          type: 'guided'
        }
      ]
    },
    yoga: {
      title: 'Yoga Practices',
      items: [
        {
          title: 'Morning Yoga Flow',
          description: 'Gentle stretches to start your day',
          duration: '15 min',
          type: 'flow'
        },
        {
          title: 'Stress Relief Yoga',
          description: 'Poses to release tension and anxiety',
          duration: '20 min',
          type: 'flow'
        },
        {
          title: 'Bedtime Yoga',
          description: 'Relaxing poses for better sleep',
          duration: '10 min',
          type: 'flow'
        },
        {
          title: 'Chair Yoga',
          description: 'Accessible poses for any fitness level',
          duration: '12 min',
          type: 'flow'
        }
      ]
    }
  };

  const handleStartPractice = (item) => {
    setSelectedPractice(item);
    setShowVideoModal(true);
  };

  const handlePreview = (item) => {
    setSelectedPractice(item);
    setShowPreviewModal(true);
  };

  const getVideoUrl = (title) => {
    if (title === '5-Minute Breathing Meditation') {
      return 'https://www.youtube.com/embed/LiUnFJ8P4gM?autoplay=1&mute=1';
    } else if (title === 'Body Scan Meditation') {
      return 'https://www.youtube.com/embed/nnVCadMo3qI?autoplay=1&mute=1';
    } else if (title === 'Mindfulness Meditation') {
      return 'https://www.youtube.com/embed/svVDEkBQxpU?autoplay=1&mute=1';
    } else if (title === 'Loving-Kindness Meditation') {
      return 'https://www.youtube.com/embed/sDi40FQcaIU?autoplay=1&mute=1';
    } else if (title === 'Morning Yoga Flow') {
      return 'https://www.youtube.com/embed/j8bEWn2E9uo?autoplay=1&mute=1';
    } else if (title === 'Stress Relief Yoga') {
      return 'https://www.youtube.com/embed/yqeirBfn2j4?autoplay=1&mute=1';
    } else if (title === 'Bedtime Yoga') {
      return 'https://www.youtube.com/embed/q-76wcHi9GM?autoplay=1&mute=1';
    } else if (title === 'Chair Yoga') {
      return 'https://www.youtube.com/embed/ihcBeW0eMWc?autoplay=1&mute=1';
    }
    return null;
  };

  const getPreviewContent = (title) => {
    if (title === '5-Minute Breathing Meditation') {
      return [
        'Find a comfortable seated position',
        'Inhale for 4 seconds, hold for 2',
        'Exhale slowly for 6 seconds',
        'Repeat for 5 minutes, relaxing your shoulders and jaw'
      ];
    } else if (title === 'Body Scan Meditation') {
      return [
        'Lie down comfortably or sit in a chair',
        'Start by focusing on your breath',
        'Slowly scan your body from head to toe',
        'Notice sensations without judgment and release tension'
      ];
    } else if (title === 'Mindfulness Meditation') {
      return [
        'Sit comfortably with your back straight',
        'Focus on your breath as an anchor',
        'Notice thoughts and feelings without judgment',
        'Gently return attention to the present moment'
      ];
    } else if (title === 'Loving-Kindness Meditation') {
      return [
        'Sit comfortably and close your eyes',
        'Begin by sending love to yourself',
        'Extend love to loved ones and friends',
        'Send compassion to all beings everywhere'
      ];
    } else if (title === 'Morning Yoga Flow') {
      return [
        'Gentle warm-up stretches and neck rolls',
        'Sun salutation flow with breathing',
        'Standing poses for strength and balance',
        'Cool-down stretches to energize your day'
      ];
    } else if (title === 'Stress Relief Yoga') {
      return [
        'Gentle forward folds to release tension',
        'Hip-opening poses to release stored stress',
        'Twists to wring out toxins and tension',
        'Restorative poses for deep relaxation'
      ];
    } else if (title === 'Bedtime Yoga') {
      return [
        'Gentle stretches to prepare for sleep',
        'Forward folds to calm the nervous system',
        'Hip and shoulder openers for relaxation',
        'Final relaxation pose for deep rest'
      ];
    } else if (title === 'Chair Yoga') {
      return [
        'Seated warm-up movements',
        'Gentle stretches for neck and shoulders',
        'Seated twists and forward folds',
        'Breathing exercises for relaxation'
      ];
    }
    return ['Preview coming soon for this practice.'];
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: '48px'}}>
          <h1 style={{fontSize: '48px', fontWeight: '700', marginBottom: '16px'}}>🧘 Meditation & Yoga</h1>
          <p style={{fontSize: '18px', color: 'var(--muted)'}}>
            Find your inner peace with guided meditation and yoga sessions
          </p>
        </div>

        {/* Category Buttons */}
        <div style={{display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '32px'}}>
          <button
            className={`btn ${selectedCategory === 'meditation' ? 'btn-primary' : 'btn-outline'} small`}
            onClick={() => setSelectedCategory('meditation')}
          >
            Meditation
          </button>
          <button
            className={`btn ${selectedCategory === 'yoga' ? 'btn-primary' : 'btn-outline'} small`}
            onClick={() => setSelectedCategory('yoga')}
          >
            Yoga
          </button>
        </div>

        {/* Content Title */}
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <h2 style={{fontSize: '32px', fontWeight: '600', margin: 0}}>
            {content[selectedCategory].title}
          </h2>
        </div>

        {/* Practice Items */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px'}}>
          {content[selectedCategory].items.map((item, index) => (
            <div
              key={index}
              style={{
                background: 'var(--glass)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--accent)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px'}}>
                <h4 style={{margin: 0, color: 'var(--text)'}}>{item.title}</h4>
                <span style={{
                  background: 'var(--accent)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {item.duration}
                </span>
              </div>
              <p style={{margin: '0 0 8px', color: 'var(--muted)', fontSize: '14px'}}>{item.description}</p>
              <div style={{display: 'flex', gap: '8px'}}>
                <button
                  className="btn btn-primary small"
                  style={{padding: '6px 12px', fontSize: '12px'}}
                  onClick={() => handleStartPractice(item)}
                >
                  Start Practice
                </button>
                <button
                  className="btn btn-outline small"
                  style={{padding: '6px 12px', fontSize: '12px'}}
                  onClick={() => handlePreview(item)}
                >
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {showVideoModal && selectedPractice && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              position: 'relative',
              width: '90%',
              maxWidth: '800px',
              background: 'var(--surface)',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <button
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '15px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text)',
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
                onClick={() => setShowVideoModal(false)}
              >
                &times;
              </button>
              <h3 style={{margin: '0 0 16px', color: 'var(--text)'}}>Practice Video</h3>
              {getVideoUrl(selectedPractice.title) ? (
                <div style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: '12px'
                }}>
                  <iframe
                    src={getVideoUrl(selectedPractice.title)}
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
              ) : (
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: 'var(--muted)'
                }}>
                  {selectedPractice.title} practice will be available soon!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreviewModal && selectedPractice && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              position: 'relative',
              width: '90%',
              maxWidth: '680px',
              background: 'var(--surface)',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <button
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '15px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text)',
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
                onClick={() => setShowPreviewModal(false)}
              >
                &times;
              </button>
              <h3 style={{margin: '0 0 10px'}}>Quick Preview</h3>
              <p style={{margin: '0 0 14px', color: 'var(--muted)'}}>What you'll do in this practice</p>
              <ul style={{margin: '0 0 12px 18px', lineHeight: '1.6'}}>
                {getPreviewContent(selectedPractice.title).map((step, index) => (
                  <li key={index} style={{marginBottom: '8px'}}>{step}</li>
                ))}
              </ul>
              <div style={{marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'flex-end'}}>
                <button
                  className="btn btn-primary small"
                  onClick={() => {
                    setShowPreviewModal(false);
                    handleStartPractice(selectedPractice);
                  }}
                >
                  Start Practice
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{textAlign: 'center', marginTop: '48px'}}>
          <Link to="/dashboard" className="btn btn-outline">← Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default MeditationYoga;
