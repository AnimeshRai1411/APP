import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import Icon from './Icon';

const WhyItMatters = () => {
  const impactCards = [
    {
      icon: 'trending',
      title: 'Rising Attacks',
      description: 'Cyberattacks are increasing by 15% annually, with sophisticated threats targeting organizations of all sizes.',
      stat: '+15%',
      statLabel: 'Annual increase'
    },
    {
      icon: 'dollar',
      title: 'Financial Impact',
      description: 'The average cost of a data breach has reached $4.45 million, with recovery taking months or years.',
      stat: '$4.45M',
      statLabel: 'Average breach cost'
    },
    {
      icon: 'clock',
      title: 'Manual Processes',
      description: 'Traditional security assessments are time-consuming, expensive, and often outdated by the time they\'re completed.',
      stat: '287 days',
      statLabel: 'To identify breach'
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Why It Matters</span>
          </h2>
          <p className="text-xl text-cyber-light/80 max-w-3xl mx-auto">
            In today's digital landscape, cybersecurity isn't just an IT concern—it's a business imperative that affects every aspect of your organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impactCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full text-center" glow>
                <div className="mb-6">
                  <Icon name={card.icon} size={48} className="mx-auto mb-4" animated />
                  <h3 className="text-2xl font-bold text-cyber-light mb-4">
                    {card.title}
                  </h3>
                  <p className="text-cyber-light/70 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>
                
                <div className="border-t border-cyber-blue/50 pt-6">
                  <div className="text-3xl font-bold text-cyber-cyan mb-2">
                    {card.stat}
                  </div>
                  <div className="text-sm text-cyber-light/60">
                    {card.statLabel}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-cyber-blue/50 to-cyber-dark/50 border-cyber-cyan/30">
            <div className="text-center">
              <Icon name="alert" size={48} className="mx-auto mb-4 text-yellow-400" />
              <h3 className="text-2xl font-bold text-cyber-light mb-4">
                Don't Wait for a Breach
              </h3>
              <p className="text-cyber-light/80 text-lg mb-6">
                Proactive cybersecurity assessment is your first line of defense. 
                Get your CyberRisk score today and take control of your security posture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-cyber-cyan to-blue-500 text-cyber-dark font-semibold rounded-lg hover:from-cyber-cyan/80 hover:to-blue-500/80 transition-all duration-300 shadow-lg shadow-cyber-cyan/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('scenario').scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Your Risk Score
                </motion.button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyItMatters;
