import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Countdown.css';

const Countdown = () => {
  const [countdown, setCountdown] = useState({ 
    days: 0, 
    hours: 0, 
    minutes: 0, 
    seconds: 0 
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const target = new Date('2026-01-24T00:00:00');
      const now = new Date();
      const difference = target - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Don't show countdown if date has passed
  if (countdown.days === 0 && countdown.hours === 0) {
    return null;
  }

  return (
    <motion.section
      className="countdown-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title">Countdown to Your Special Day</h2>
      <div className="countdown-grid">
        {Object.entries(countdown).map(([unit, value]) => (
          <motion.div
            key={unit}
            className="countdown-card"
            whileHover={{ scale: 1.05 }}
          >
            <span className="countdown-value">{value}</span>
            <span className="countdown-unit">{unit}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Countdown;