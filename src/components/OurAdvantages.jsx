import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import Icon from './Icon';

const OurAdvantages = () => {
  const advantages = [
    {
      icon: 'zap',
      title: 'Automated',
      description: 'AI-powered scanning eliminates manual processes and human error, delivering consistent and comprehensive assessments.',
      features: [
        '24/7 continuous monitoring',
        'Automated vulnerability detection',
        'Real-time threat intelligence',
        'Self-healing recommendations'
      ]
    },
    {
      icon: 'clock',
      title: 'Fast',
      description: 'Get your complete cybersecurity assessment in days, not months. Traditional assessments take 3-6 months.',
      features: [
        'Assessment in 48-72 hours',
        'Real-time reporting',
        'Instant recommendations',
        'Rapid deployment'
      ]
    },
    {
      icon: 'target',
      title: 'Accurate',
      description: 'Advanced algorithms and machine learning provide precise risk scoring with 95%+ accuracy.',
      features: [
        '95%+ accuracy rate',
        'Industry-standard benchmarks',
        'Context-aware analysis',
        'Continuous learning'
      ]
    },
    {
      icon: 'shield',
      title: 'Insurer-Trusted',
      description: 'Our scoring methodology is recognized by leading cyber insurance providers for risk assessment.',
      features: [
        'Insurance industry validation',
        'Regulatory compliance',
        'Audit-ready reports',
        'Third-party verification'
      ]
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-cyber-blue/20 to-cyber-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Our Advantages</span>
          </h2>
          <p className="text-xl text-cyber-light/80 max-w-3xl mx-auto">
            Why leading organizations choose CyberRisk for their cybersecurity assessment needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full group" glow>
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-cyber-cyan/20 to-blue-400/20 rounded-xl flex items-center justify-center group-hover:from-cyber-cyan/30 group-hover:to-blue-400/30 transition-all duration-300">
                      <Icon name={advantage.icon} size={32} className="text-cyber-cyan" />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-cyber-light mb-3 group-hover:text-cyber-cyan transition-colors duration-300">
                      {advantage.title}
                    </h3>
                    <p className="text-cyber-light/80 leading-relaxed mb-4">
                      {advantage.description}
                    </p>
                    
                    <div className="space-y-2">
                      {advantage.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 bg-cyber-cyan rounded-full mr-3 flex-shrink-0" />
                          <span className="text-sm text-cyber-light/70">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="overflow-hidden">
            <h3 className="text-2xl font-bold text-cyber-light mb-8 text-center">
              CyberRisk vs Traditional Assessment
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyber-blue/50">
                    <th className="text-left py-4 px-6 text-cyber-light font-semibold">Feature</th>
                    <th className="text-center py-4 px-6 text-cyber-cyan font-semibold">CyberRisk</th>
                    <th className="text-center py-4 px-6 text-cyber-light/60 font-semibold">Traditional</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Assessment Time', cyberrisk: '2-3 days', traditional: '3-6 months' },
                    { feature: 'Cost', cyberrisk: '$5K - $15K', traditional: '$50K - $200K' },
                    { feature: 'Accuracy', cyberrisk: '95%+', traditional: '70-80%' },
                    { feature: 'Updates', cyberrisk: 'Real-time', traditional: 'Annual' },
                    { feature: 'Automation', cyberrisk: 'Fully automated', traditional: 'Manual process' },
                    { feature: 'Scalability', cyberrisk: 'Unlimited', traditional: 'Limited' }
                  ].map((row, index) => (
                    <motion.tr
                      key={row.feature}
                      className="border-b border-cyber-blue/20 hover:bg-cyber-blue/10 transition-colors duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <td className="py-4 px-6 text-cyber-light font-medium">{row.feature}</td>
                      <td className="py-4 px-6 text-center text-cyber-cyan font-semibold">{row.cyberrisk}</td>
                      <td className="py-4 px-6 text-center text-cyber-light/60">{row.traditional}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default OurAdvantages;
