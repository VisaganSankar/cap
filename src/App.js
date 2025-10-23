import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Music from './pages/Music';
import Chatbot from './pages/Chatbot';
import MeditationYoga from './pages/MeditationYoga';
import RelaxationExercises from './pages/RelaxationExercises';
import MeetCounselor from './pages/MeetCounselor';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="music" element={<Music />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="meditation-yoga" element={<MeditationYoga />} />
          <Route path="relaxation-exercises" element={<RelaxationExercises />} />
          <Route path="meet-counselor" element={<MeetCounselor />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
