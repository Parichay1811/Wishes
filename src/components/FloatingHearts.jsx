import React from 'react';
import { motion } from 'framer-motion';
import '../styles/FloatingHearts.css';

const FloatingHeart = ({ delay }) => (
  <motion.div
    className="floating-heart"
    initial={{ y: 100, opacity: 0, x: Math.random() * 100 }}
    animate={{
      y: -100,
      opacity: [0, 1, 1, 0],
      x: Math.random() * 100
    }}
    transition={{
      duration: 6,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    ❤️
  </motion.div>
);

const FloatingHearts = () => {
  return (
    <div className="hearts-background">
      {[...Array(8)].map((_, i) => (
        <FloatingHeart key={i} delay={i * 0.8} />
      ))}
    </div>
  );
};

export default FloatingHearts;