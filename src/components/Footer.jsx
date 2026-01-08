import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.p
        className="footer-text"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Made with ❤️ by your loving brother
      </motion.p>
    </motion.footer>
  );
};

export default Footer;