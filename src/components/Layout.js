import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    // Always apply light theme
    document.body.classList.add('theme-light');
  }, []);

  return (
    <>
      <Header 
        isNavOpen={isNavOpen} 
        setIsNavOpen={setIsNavOpen}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
