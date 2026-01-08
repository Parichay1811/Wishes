import React from 'react';
import { motion } from 'framer-motion';
import { BROTHER_MESSAGE } from '../data/content';
import '../styles/Message.css';

const Message = () => {
  return (
    <motion.section
      className="message-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="message-card">
        <h2 className="message-title">A Message from Your Brother</h2>
        <div className="message-content">
          <p className="message-greeting">{BROTHER_MESSAGE.greeting}</p>
          
          {BROTHER_MESSAGE.paragraphs.map((paragraph, index) => (
            <p key={index} className="message-paragraph">
              {paragraph}
            </p>
          ))}
          
          <p className="message-signature">
            {BROTHER_MESSAGE.signature}
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default Message;