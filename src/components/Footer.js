import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© {currentYear} Soothescape</span>
        <div className="footer-actions">
          <a href="#home">Back to top</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
