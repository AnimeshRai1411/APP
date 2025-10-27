import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  glow = false,
  ...props 
}) => {
  const baseClasses = 'glass-effect rounded-xl p-6 transition-all duration-300';
  const hoverClasses = hover ? 'hover-lift' : '';
  const glowClasses = glow ? 'cyber-glow' : '';
  
  const classes = `${baseClasses} ${hoverClasses} ${glowClasses} ${className}`;
  
  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
