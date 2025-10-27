import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import AnimatedBackground from './AnimatedBackground';
import Icon from './Icon';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          >
            <Icon name="shield" size={80} className="mx-auto mb-6" animated />
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="gradient-text">CyberRisk</span>
            <br />
            <span className="text-cyber-light">The Credit Score for</span>
            <br />
            <span className="gradient-text">Cybersecurity</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-cyber-light/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Quantify your organization's cyber vulnerability in one score.
            <br />
            <span className="text-cyber-cyan font-medium">
              Make informed decisions. Reduce risk. Protect your future.
            </span>
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button
              variant="primary"
              size="xl"
              onClick={() => document.getElementById('scenario').scrollIntoView({ behavior: 'smooth' })}
            >
              Get Your Score
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-cyber-cyan mb-2">$4.45M</div>
            <div className="text-cyber-light/70">Average data breach cost</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyber-cyan mb-2">287</div>
            <div className="text-cyber-light/70">Days to identify breach</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyber-cyan mb-2">95%</div>
            <div className="text-cyber-light/70">Of breaches are preventable</div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-cyber-cyan/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-cyber-cyan rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
