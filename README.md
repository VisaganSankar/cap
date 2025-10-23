# Soothescape - React Application

A mental health support platform built with React, converted from the original HTML/CSS/JavaScript website.

## Features

- **Home Page**: Landing page with hero section, target audience, vision, features, and team information
- **Authentication**: Login system with localStorage persistence
- **Dashboard**: Central hub for accessing all mental health features
- **Music Therapy**: Curated collection of relaxing music and sounds
- **AI Chatbot**: Interactive mental health companion named Aimee
- **Meditation & Yoga**: Guided sessions for mindfulness and relaxation
- **Relaxation Exercises**: Breathing techniques and stress relief exercises
- **Counselor Booking**: Connect with licensed mental health professionals

## Technology Stack

- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing for navigation
- **Context API**: State management for authentication
- **CSS3**: Modern styling with CSS custom properties and responsive design

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd C:\Users\91807\OneDrive\Desktop\website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and visit `http://localhost:3000`

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── sections/          # Home page sections
│   │   ├── Hero.js
│   │   ├── Problem.js
│   │   ├── Vision.js
│   │   ├── Features.js
│   │   └── Team.js
│   ├── Header.js          # Navigation header
│   ├── Footer.js          # Site footer
│   └── Layout.js          # Main layout wrapper
├── contexts/
│   └── AuthContext.js     # Authentication state management
├── pages/                 # Route components
│   ├── Home.js
│   ├── Login.js
│   ├── Dashboard.js
│   ├── Music.js
│   ├── Chatbot.js
│   ├── MeditationYoga.js
│   ├── RelaxationExercises.js
│   └── MeetCounselor.js
├── App.js                 # Main app component with routing
├── index.js              # App entry point
└── index.css             # Global styles
```

## Features Overview

### Authentication
- Simple login system with username/password
- Persistent login state using localStorage
- Protected routes and user session management

### Mental Health Tools
- **Music Therapy**: Audio tracks for relaxation and stress relief
- **AI Chatbot**: Conversational AI for emotional support
- **Meditation & Yoga**: Guided sessions with different difficulty levels
- **Relaxation Exercises**: Step-by-step breathing and relaxation techniques
- **Counselor Booking**: Professional mental health support booking system

### Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly navigation and interactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of a final-year engineering project focused on mental health support.

## Contact

Built by:
- Aishwarya Vijayakumar
- Abinash Das
- Visagan

For support or questions, please contact the development team.
