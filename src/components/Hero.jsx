import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Hero.css';

const Hero = () => {
  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      className="hero-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="hero-content"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.h1
          className="hero-title"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 100
          }}
        >
          Happy 4 Years of Togetherness 💍❤️
        </motion.h1>
        
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Celebrating four beautiful years of love, laughter, and endless memories
        </motion.p>

        <motion.p
          className="hero-date"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          January 24, 2026
        </motion.p>

        <motion.button
          className="cta-button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 10px 30px rgba(255, 105, 135, 0.4)" 
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToGallery}
        >
          Relive Your Journey
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default Hero;