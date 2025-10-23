import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RelaxationExercises = () => {
  const [selectedCategory, setSelectedCategory] = useState('progressive');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const content = {
    progressive: {
      title: 'Progressive Muscle Relaxation',
      items: [
        {
          title: 'Full Body Relaxation',
          description: 'Complete progressive muscle relaxation for deep calm',
          duration: '20 min',
          type: 'guided'
        },
        {
          title: 'Quick Tension Release',
          description: 'Fast 5-minute muscle relaxation technique',
          duration: '5 min',
          type: 'guided'
        },
        {
          title: 'Bedtime Relaxation',
          description: 'Gentle muscle relaxation for better sleep',
          duration: '15 min',
          type: 'guided'
        }
      ]
    },
    breathing: {
      title: 'Breathing Techniques',
      items: [
        {
          title: '4-7-8 Breathing',
          description: 'Calming breathing pattern for anxiety relief',
          duration: '10 min',
          type: 'guided'
        },
        {
          title: 'Box Breathing',
          description: 'Military technique for focus and calm',
          duration: '8 min',
          type: 'guided'
        },
        {
          title: 'Diaphragmatic Breathing',
          description: 'Deep belly breathing for stress reduction',
          duration: '12 min',
          type: 'guided'
        }
      ]
    }
  };

  const handleStartPractice = (item) => {
    setSelectedExercise(item);
    setShowVideoModal(true);
  };

  const handlePreview = (item) => {
    setSelectedExercise(item);
    setShowPreviewModal(true);
  };

  const getVideoUrl = (title) => {
    if (title === 'Full Body Relaxation') {
      return 'https://www.youtube.com/embed/_1h-zizAGsc?autoplay=1&mute=1';
    } else if (title === 'Quick Tension Release') {
      return 'https://www.youtube.com/embed/QVpJ4lX5cPA?autoplay=1&mute=1';
    } else if (title === 'Bedtime Relaxation') {
      return 'https://www.youtube.com/embed/Zlwk82OM9Us?autoplay=1&mute=1';
    } else if (title === '4-7-8 Breathing') {
      return 'https://www.youtube.com/embed/8ws-EIvzrls?autoplay=1&mute=1';
    } else if (title === 'Box Breathing') {
      return 'https://www.youtube.com/embed/oq5pZ7dpUDc?autoplay=1&mute=1';
    } else if (title === 'Diaphragmatic Breathing') {
      return 'https://www.youtube.com/embed/zPgwQFU1Cwc?autoplay=1&mute=1';
    }
    return null;
  };

  const getPreviewSteps = (title) => {
    if (title === 'Full Body Relaxation') {
      return [
        'Start with your feet and work upward',
        'Tense each muscle group for 5 seconds',
        'Release and feel the relaxation',
        'Continue through all major muscle groups'
      ];
    } else if (title === 'Quick Tension Release') {
      return [
        'Focus on your shoulders and neck',
        'Gently tense and release tension',
        'Move to jaw and facial muscles',
        'End with deep breathing'
      ];
    } else if (title === 'Bedtime Relaxation') {
      return [
        'Lie comfortably in bed',
        'Progressive relaxation from toes to head',
        'Focus on releasing all tension',
        'Drift into peaceful sleep'
      ];
    } else if (title === '4-7-8 Breathing') {
      return [
        'Inhale through nose for 4 counts',
        'Hold breath for 7 counts',
        'Exhale through mouth for 8 counts',
        'Repeat 4-8 cycles'
      ];
    } else if (title === 'Box Breathing') {
      return [
        'Inhale for 4 counts',
        'Hold for 4 counts',
        'Exhale for 4 counts',
        'Hold empty for 4 counts'
      ];
    } else if (title === 'Diaphragmatic Breathing') {
      return [
        'Place hand on belly',
        'Breathe into belly, not chest',
        'Feel belly rise and fall',
        'Practice deep, slow breaths'
      ];
    }
    return ['Preview coming soon for this practice.'];
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: '48px'}}>
          <h1 style={{fontSize: '48px', fontWeight: '700', marginBottom: '16px'}}>💆 Relaxation Exercises</h1>
          <p style={{fontSize: '18px', color: 'var(--muted)'}}>
            Practice these proven techniques to reduce stress and anxiety
          </p>
        </div>

        {/* Category Buttons */}
        <div style={{display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '32px'}}>
          <button
            className={`btn ${selectedCategory === 'progressive' ? 'btn-primary' : 'btn-outline'} small`}
            onClick={() => setSelectedCategory('progressive')}
          >
            Progressive Relaxation
          </button>
          <button
            className={`btn ${selectedCategory === 'breathing' ? 'btn-primary' : 'btn-outline'} small`}
            onClick={() => setSelectedCategory('breathing')}
          >
            Breathing Techniques
          </button>
        </div>

        {/* Content Title */}
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <h2 style={{fontSize: '32px', fontWeight: '600', margin: 0}}>
            {content[selectedCategory].title}
          </h2>
        </div>

        {/* Exercise Items */}
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
        {showVideoModal && selectedExercise && (
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
              {getVideoUrl(selectedExercise.title) ? (
                <div style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: '12px'
                }}>
                  <iframe
                    src={getVideoUrl(selectedExercise.title)}
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
                  {selectedExercise.title} practice will be available soon!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreviewModal && selectedExercise && (
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
                {getPreviewSteps(selectedExercise.title).map((step, index) => (
                  <li key={index} style={{marginBottom: '8px'}}>{step}</li>
                ))}
              </ul>
              <div style={{marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'flex-end'}}>
                <button
                  className="btn btn-primary small"
                  onClick={() => {
                    setShowPreviewModal(false);
                    handleStartPractice(selectedExercise);
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

export default RelaxationExercises;