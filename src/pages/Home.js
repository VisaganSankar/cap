import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import Problem from '../components/sections/Problem';
import Vision from '../components/sections/Vision';
import Features from '../components/sections/Features';
import Team from '../components/sections/Team';

const Home = () => {
  return (
    <>
      <Hero />
      <Problem />
      <Vision />
      <Features />
      <Team />
    </>
  );
};

export default Home;
