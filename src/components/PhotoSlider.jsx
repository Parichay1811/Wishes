import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHOTOS } from '../data/content';
import '../styles/PhotoSlider.css';

const PhotoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % PHOTOS.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  return (
    <section className="gallery-section" id="gallery">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Your Beautiful Journey
      </motion.h2>

      <div className="slider-container">
        <button className="slider-nav prev" onClick={prevSlide}>
          ←
        </button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            className="slide"
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset }) => {
              if (offset.x > 100) {
                prevSlide();
              } else if (offset.x < -100) {
                nextSlide();
              }
            }}
          >
            <div className="slide-card">
              <img
                src={PHOTOS[currentSlide].imageUrl}
                alt={PHOTOS[currentSlide].caption}
                className="slide-image"
              />
              <div className="slide-content">
                <h3 className="slide-caption">{PHOTOS[currentSlide].caption}</h3>
                <p className="slide-memory">{PHOTOS[currentSlide].memory}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button className="slider-nav next" onClick={nextSlide}>
          →
        </button>
      </div>

      <div className="slider-dots">
        {PHOTOS.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default PhotoSlider;