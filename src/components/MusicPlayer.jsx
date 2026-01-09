import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/MusicPlayer.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef(null);

  const musicUrl = '/perfect.mp3';

  // Start music automatically when component mounts
  useEffect(() => {
    const startMusic = async () => {
      if (audioRef.current && !isPlaying) {
        try {
          // Set volume to a pleasant level
          audioRef.current.volume = 0.5;
          
          // Try to play immediately
          await audioRef.current.play();
          setIsPlaying(true);
          setAudioReady(true);
          
          // Hide welcome message after music starts
          setTimeout(() => {
            setShowWelcome(false);
          }, 3000);
        } catch (error) {
          console.log('Autoplay blocked, will start on user interaction');
          setAudioReady(true);
        }
      }
    };

    // Small delay to ensure audio element is ready
    const timer = setTimeout(startMusic, 500);
    return () => clearTimeout(timer);
  }, []);

  // Fallback: Start music on ANY user interaction if autoplay failed
  useEffect(() => {
    const startOnInteraction = async () => {
      if (audioRef.current && !isPlaying && audioReady) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setShowWelcome(false);
        } catch (error) {
          // Silently fail
        }
      }
    };

    // Listen for various interaction events
    const events = ['click', 'touchstart', 'scroll', 'keydown', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, startOnInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, startOnInteraction);
      });
    };
  }, [isPlaying, audioReady]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.log('Playback failed:', error);
          });
      }
    }
  };

  return (
    <>
      {/* Audio element with autoplay attributes */}
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        autoPlay
        preload="auto"
        playsInline
        muted={false}
      />

      {/* Welcome overlay with unmute prompt (if needed) */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="welcome-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => {
              if (!isPlaying && audioRef.current) {
                audioRef.current.play();
                setIsPlaying(true);
              }
              setShowWelcome(false);
            }}
          >
            <motion.div
              className="welcome-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="welcome-icon">
              <h2 className="welcome-title">Welcome!</h2>
              <p className="welcome-text">
                {isPlaying 
                  ? "Enjoy the music as you relive beautiful memories 💝"
                  : "Click to open the surprise😀"
                }
              </p>
              <motion.button
                className="welcome-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (!isPlaying && audioRef.current) {
                    audioRef.current.play();
                    setIsPlaying(true);
                  }
                  setShowWelcome(false);
                }}
              >
                {isPlaying ? "Continue" : "Start"}
              </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Control Button */}
      <motion.div
        className="music-player"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.button
          className={`music-button ${isPlaying ? 'playing' : 'paused'}`}
          onClick={toggleMusic}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {/* Play/Pause Icon */}
          <div className="music-icon">
            {isPlaying ? (
              <motion.div
                className="pause-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ⏸️
              </motion.div>
            ) : (
              <motion.div
                className="play-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ▶️
              </motion.div>
            )}
          </div>
          
          {/* Rotating vinyl record effect when playing */}
          {isPlaying && (
            <motion.div
              className="vinyl-record"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              💿
            </motion.div>
          )}
          
          {/* Sound waves animation */}
          {isPlaying && (
            <div className="sound-waves">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="wave"
                  animate={{
                    scaleY: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
        </motion.button>

        {/* Status tooltip */}
        <motion.div
          className="music-status"
          initial={{ opacity: 0 }}
          animate={{ opacity: isPlaying ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          {isPlaying ? 'Playing' : 'Paused'}
        </motion.div>
      </motion.div>
    </>
  );
};

export default MusicPlayer;