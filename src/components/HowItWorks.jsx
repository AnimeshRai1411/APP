import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import Icon from './Icon';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: 'target',
      title: 'Scan',
      subtitle: 'Identify Weak Points',
      description: 'Our advanced AI-powered scanner analyzes your entire digital infrastructure, identifying vulnerabilities across networks, applications, and systems.',
      features: [
        'Network vulnerability assessment',
        'Application security scanning',
        'Configuration analysis',
        'Threat intelligence integration'
      ]
    },
    {
      number: '02',
      icon: 'chart',
      title: 'Analyze',
      subtitle: 'Score Your Risk',
      description: 'Sophisticated algorithms evaluate your security posture, considering industry standards, threat landscape, and organizational context.',
      features: [
        'Risk scoring algorithm',
        'Industry benchmarking',
        'Threat modeling',
        'Compliance assessment'
      ]
    },
    {
      number: '03',
      icon: 'eye',
      title: 'Report',
      subtitle: 'Clear, Actionable Results',
      description: 'Receive comprehensive reports with prioritized recommendations, implementation guides, and ongoing monitoring insights.',
      features: [
        'Prioritized recommendations',
        'Implementation roadmap',
        'Cost-benefit analysis',
        'Continuous monitoring'
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 bg-gradient-to-b from-cyber-dark to-cyber-blue/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">How It Works</span>
          </h2>
          <p className="text-xl text-cyber-light/80 max-w-3xl mx-auto">
            Our three-step process delivers comprehensive cybersecurity assessment in days, not months.
          </p>
        </motion.div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Content */}
              <div className={index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                <Card className="h-full" glow>
                  <div className="flex items-center mb-6">
                    <div className="text-6xl font-bold text-cyber-cyan/30 mr-4">
                      {step.number}
                    </div>
                    <div>
                      <Icon name={step.icon} size={40} className="mb-2" />
                      <h3 className="text-3xl font-bold text-cyber-light">
                        {step.title}
                      </h3>
                      <p className="text-cyber-cyan font-medium">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-cyber-light/80 text-lg mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                      >
                        <Icon name="check" size={16} className="text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-cyber-light/70">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Visual */}
              <div className={index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                >
                  <div className="aspect-square bg-gradient-to-br from-cyber-blue/50 to-cyber-dark/50 rounded-2xl flex items-center justify-center border border-cyber-cyan/20">
                    <div className="text-center">
                      <Icon name={step.icon} size={80} className="mx-auto mb-4" animated />
                      <div className="text-2xl font-bold text-cyber-cyan mb-2">
                        {step.number}
                      </div>
                      <div className="text-cyber-light/60">
                        {step.title}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyber-cyan/20 rounded-full animate-pulse" />
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline connector */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 mt-8">
          <div className="w-1 h-32 bg-gradient-to-b from-cyber-cyan/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
