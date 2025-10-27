import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import Icon from './Icon';

const UseCases = () => {
  const [activeTab, setActiveTab] = useState(0);

  const useCases = [
    {
      title: 'Companies',
      icon: 'building',
      description: 'Organizations seeking to understand and improve their cybersecurity posture.',
      benefits: [
        'Identify vulnerabilities before attackers do',
        'Prioritize security investments effectively',
        'Meet compliance requirements',
        'Reduce cyber insurance premiums',
        'Protect brand reputation',
        'Ensure business continuity'
      ],
      features: [
        'Comprehensive security assessment',
        'Risk scoring and benchmarking',
        'Actionable remediation plans',
        'Continuous monitoring',
        'Executive reporting',
        'Compliance mapping'
      ],
      stats: {
        primary: '85%',
        primaryLabel: 'Reduction in breach risk',
        secondary: '$2.3M',
        secondaryLabel: 'Average savings'
      }
    },
    {
      title: 'Insurers',
      icon: 'shield',
      description: 'Cyber insurance providers needing accurate risk assessment for underwriting.',
      benefits: [
        'Accurate risk pricing',
        'Reduced claim frequency',
        'Faster underwriting process',
        'Better loss ratios',
        'Competitive advantage',
        'Regulatory compliance'
      ],
      features: [
        'Automated risk scoring',
        'Real-time risk updates',
        'Claims prediction models',
        'Policy optimization',
        'Fraud detection',
        'Regulatory reporting'
      ],
      stats: {
        primary: '40%',
        primaryLabel: 'Faster underwriting',
        secondary: '25%',
        secondaryLabel: 'Lower loss ratios'
      }
    },
    {
      title: 'Regulators',
      icon: 'scale',
      description: 'Government agencies and regulatory bodies monitoring industry compliance.',
      benefits: [
        'Industry-wide risk visibility',
        'Compliance monitoring',
        'Threat intelligence sharing',
        'Policy development support',
        'Incident response coordination',
        'Public safety protection'
      ],
      features: [
        'Sector risk analysis',
        'Compliance tracking',
        'Threat landscape mapping',
        'Incident correlation',
        'Trend analysis',
        'Public reporting'
      ],
      stats: {
        primary: '60%',
        primaryLabel: 'Faster incident response',
        secondary: '90%',
        secondaryLabel: 'Compliance accuracy'
      }
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-cyber-dark to-cyber-blue/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Use Cases</span>
          </h2>
          <p className="text-xl text-cyber-light/80 max-w-3xl mx-auto">
            CyberRisk serves diverse stakeholders across the cybersecurity ecosystem.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {useCases.map((useCase, index) => (
            <button
              key={useCase.title}
              onClick={() => setActiveTab(index)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-lg transition-all duration-300 ${
                activeTab === index
                  ? 'bg-cyber-cyan text-cyber-dark'
                  : 'bg-cyber-blue/30 text-cyber-light/70 hover:bg-cyber-blue/50 hover:text-cyber-light'
              }`}
            >
              <Icon name={useCase.icon} size={20} />
              <span className="font-semibold">{useCase.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Content */}
            <div className="space-y-6">
              <Card glow>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyber-cyan/20 to-blue-400/20 rounded-xl flex items-center justify-center mr-4">
                    <Icon name={useCases[activeTab].icon} size={32} className="text-cyber-cyan" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-cyber-light">
                      {useCases[activeTab].title}
                    </h3>
                    <p className="text-cyber-light/70">
                      {useCases[activeTab].description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyber-cyan mb-2">
                      {useCases[activeTab].stats.primary}
                    </div>
                    <div className="text-sm text-cyber-light/70">
                      {useCases[activeTab].stats.primaryLabel}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyber-cyan mb-2">
                      {useCases[activeTab].stats.secondary}
                    </div>
                    <div className="text-sm text-cyber-light/70">
                      {useCases[activeTab].stats.secondaryLabel}
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <h4 className="text-xl font-bold text-cyber-light mb-4">
                  Key Benefits
                </h4>
                <div className="space-y-3">
                  {useCases[activeTab].benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Icon name="check" size={16} className="text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-cyber-light/80">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Features */}
            <div>
              <Card className="h-full">
                <h4 className="text-xl font-bold text-cyber-light mb-6">
                  Platform Features
                </h4>
                <div className="space-y-4">
                  {useCases[activeTab].features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      className="flex items-start space-x-3 p-4 rounded-lg bg-cyber-blue/20 hover:bg-cyber-blue/30 transition-colors duration-300"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-cyber-cyan rounded-full mt-2 flex-shrink-0" />
                      <span className="text-cyber-light/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-cyber-blue/50">
                  <motion.button
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyber-cyan to-blue-500 text-cyber-dark font-semibold rounded-lg hover:from-cyber-cyan/80 hover:to-blue-500/80 transition-all duration-300 shadow-lg shadow-cyber-cyan/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => alert(`Demo: This would start the ${useCases[activeTab].title.toLowerCase()} onboarding process`)}
                  >
                    Get Started for {useCases[activeTab].title}
                  </motion.button>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
