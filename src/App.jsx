import React from 'react';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import PhotoSlider from './components/PhotoSlider';
import Milestones from './components/Milestones';
import Message from './components/Message';
import FloatingHearts from './components/FloatingHearts';
import Footer from './components/Footer';
import './styles/App.css';
import MusicPlayer from './components/MusicPlayer';

function App() {
  return (
    <div className="anniversary-container">
      <FloatingHearts />
      <MusicPlayer/>
      <Hero />
      <Countdown />
      <PhotoSlider />
      <Milestones />
      <Message />
      <Footer />
    </div>
  );
}

export default App;