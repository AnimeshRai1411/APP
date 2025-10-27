import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

const Footer = () => {
  const teamMembers = [
    { name: 'Abhinav Soni', role: 'Backend Developer' },
    { name: 'Prajukta Das', role: 'AI/ML Engineer' },
    { name: 'Animesh Rai', role: 'Full-Stack Developer' },
    { name: 'Samidha Lade', role: 'Security Analyst' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Use Cases', href: '#use-cases' },
    { name: 'Get Started', href: '#scenario' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: 'users', href: '#' },
    { name: 'Twitter', icon: 'users', href: '#' },
    { name: 'GitHub', icon: 'users', href: '#' }
  ];

  return (
    <footer className="bg-gradient-to-b from-cyber-blue/30 to-cyber-dark border-t border-cyber-blue/20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <Icon name="shield" size={32} className="text-cyber-cyan mr-3" />
              <span className="text-2xl font-bold gradient-text">CyberRisk</span>
            </div>
            <p className="text-cyber-light/80 leading-relaxed mb-6 max-w-md">
              The Credit Score for Cybersecurity. Quantify your organization's cyber vulnerability 
              in one score and take control of your security posture.
            </p>
            <div className="text-2xl font-bold text-cyber-cyan mb-2">
              "Safer Tomorrow. Smarter Defense. Fewer Hacks."
            </div>
            <p className="text-cyber-light/60 text-sm">
              Our mission to make cybersecurity accessible and actionable for everyone.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-cyber-light mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-cyber-light/70 hover:text-cyber-cyan transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-cyber-light mb-4">Our Team</h3>
            <ul className="space-y-2">
              {teamMembers.map((member) => (
                <li key={member.name} className="text-sm">
                  <div className="text-cyber-light/80 font-medium">{member.name}</div>
                  <div className="text-cyber-light/60">{member.role}</div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { number: '500+', label: 'Organizations Assessed' },
            { number: '95%', label: 'Accuracy Rate' },
            { number: '48hrs', label: 'Average Assessment Time' },
            { number: '$2.3M', label: 'Average Savings' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-cyber-cyan mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-cyber-light/70">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-cyber-blue/30 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-cyber-light/60 text-sm">
              © 2024 CyberRisk. All rights reserved. Built with ❤️ for cybersecurity.
            </div>
            
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-cyber-light/60 hover:text-cyber-cyan transition-colors duration-300"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-cyan via-blue-500 to-cyber-cyan opacity-50" />
      </div>
    </footer>
  );
};

export default Footer;
