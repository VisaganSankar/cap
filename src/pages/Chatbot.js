import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Aimee. How can I support you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const replyTo = (input) => {
    const text = input.trim().toLowerCase();
    if (!text) return "";
    if (/(hi|hello|hey)\b/.test(text)) return "Hi! I'm Aimee. How are you feeling today?";
    if (/stress|anxious|anxiety|overwhelmed/.test(text)) return "I'm here with you. Try a slow breath: inhale 4s, hold 4s, exhale 6s. Want a short grounding exercise?";
    if (/sleep|insomnia|tired/.test(text)) return "Sleep can be tough. A calm playlist or a brief body-scan may help. Would you like a link to Sleep music?";
    if (/motivation|focus|study|work/.test(text)) return "Let's build momentum. Try 25 minutes of focused work and a 5-minute break (Pomodoro). Want tips to get started?";
    if (/breath|breathe/.test(text)) return "Box breathing: inhale 4, hold 4, exhale 4, hold 4. Repeat 4 times. How does that feel?";
    if (/exercise|yoga|meditation/.test(text)) return "A 2-minute mindful pause: notice 5 things you see, 4 touch, 3 hear, 2 smell, 1 taste.";
    if (/help|counsel(or|ler)|therap(ist|y)/.test(text)) return "If you'd like professional support, consider speaking to a counselor. I can help you prepare questions for your first session.";
    if (/music/.test(text)) return "You can explore Music categories on the Music page. Calm, Motivational, Nature, and more.";
    return "I may not fully understand, but I'm here. Would you like breathing, grounding, music, or motivation tips?";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate bot response with specific replies
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: replyTo(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    }, 300);
  };

  return (
    <div className="section">
      <div className="container" style={{maxWidth: '800px'}}>
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <h1 style={{fontSize: '48px', fontWeight: '700', marginBottom: '16px'}}>🤖 Chat with Aimee</h1>
          <p style={{fontSize: '18px', color: 'var(--muted)'}}>
            Your AI mental health companion is here to listen and support you
          </p>
        </div>

        <div style={{
          background: 'var(--glass)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Chat Messages */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '70%',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  background: message.sender === 'user' ? 'var(--primary)' : 'var(--surface)',
                  color: message.sender === 'user' ? 'white' : 'var(--text)',
                  border: message.sender === 'bot' ? '1px solid var(--border)' : 'none'
                }}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} style={{
            padding: '20px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '12px'
          }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                background: 'var(--surface)',
                color: 'var(--text)',
                fontSize: '16px'
              }}
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>

        <div style={{textAlign: 'center', marginTop: '32px'}}>
          <Link to="/dashboard" className="btn btn-outline">← Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
