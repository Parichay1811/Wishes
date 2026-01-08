
import React from 'react';
import { motion } from 'framer-motion';
import { MILESTONES } from '../data/content';
import '../styles/Milestones.css';

const Milestones = () => {
  return (
    <section className="milestones-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Four Years of Milestones
      </motion.h2>

      <div className="milestones-grid">
        {MILESTONES.map((milestone, index) => (
          <motion.div
            key={index}
            className="milestone-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 40px rgba(255, 105, 135, 0.3)"
            }}
          >
            <div className="milestone-year">{milestone.year}</div>
            <h3 className="milestone-title">{milestone.title}</h3>
            <p className="milestone-description">{milestone.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Milestones;