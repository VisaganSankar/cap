import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ isNavOpen, setIsNavOpen }) => {
  const { isLoggedIn, username, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/">
          <span>Soothescape</span>
        </Link>
        
        <nav className={`nav ${isNavOpen ? 'open' : ''}`} id="mainNav">
          <a href="/#problem" onClick={() => setIsNavOpen(false)}>Our Audience</a>
          <a href="/#objectives" onClick={() => setIsNavOpen(false)}>Vision</a>
          <a href="/#features" onClick={() => setIsNavOpen(false)}>Features</a>
          <a href="/#team" onClick={() => setIsNavOpen(false)}>Team</a>
          
          <div id="authSection">
            {isLoggedIn && username && (
              <span className="username">Welcome, {username}</span>
            )}
            
            {!isLoggedIn ? (
              <Link className="btn btn-outline" to="/login">Login</Link>
            ) : (
              <>
                <Link className="btn btn-outline" to="/dashboard">Dashboard</Link>
                <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        </nav>
        
        <button 
          className="hamburger" 
          id="navToggle" 
          aria-label="Toggle navigation"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
