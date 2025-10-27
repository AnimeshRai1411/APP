import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import RiskScore from './RiskScore';
import Icon from './Icon';
import Button from './Button';

const RealWorldScenario = () => {
  const [selectedRecommendation, setSelectedRecommendation] = useState(0);

  const recommendations = [
    {
      title: 'Implement Multi-Factor Authentication',
      description: 'Add MFA to all critical systems and user accounts to prevent unauthorized access.',
      impact: 'High',
      effort: 'Medium',
      cost: '$5,000 - $15,000',
      timeline: '2-4 weeks'
    },
    {
      title: 'Patch Critical Vulnerabilities',
      description: 'Update all systems with the latest security patches, focusing on critical vulnerabilities.',
      impact: 'Critical',
      effort: 'High',
      cost: '$10,000 - $25,000',
      timeline: '1-2 weeks'
    },
    {
      title: 'Employee Security Training',
      description: 'Conduct comprehensive cybersecurity awareness training for all employees.',
      impact: 'Medium',
      effort: 'Low',
      cost: '$2,000 - $5,000',
      timeline: '1 week'
    },
    {
      title: 'Network Segmentation',
      description: 'Implement network segmentation to limit lateral movement in case of breach.',
      impact: 'High',
      effort: 'High',
      cost: '$15,000 - $30,000',
      timeline: '4-6 weeks'
    }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Critical': return 'text-red-400';
      case 'High': return 'text-orange-400';
      case 'Medium': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  const getEffortColor = (effort) => {
    switch (effort) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-cyber-light';
    }
  };

  return (
    <section id="scenario" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Real-World Scenario</span>
          </h2>
          <p className="text-xl text-cyber-light/80 max-w-3xl mx-auto">
            See how CyberRisk helps organizations understand and improve their security posture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Company Profile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full" glow>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-cyber-cyan to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="building" size={40} className="text-cyber-dark" />
                </div>
                <h3 className="text-2xl font-bold text-cyber-light mb-2">
                  Company A
                </h3>
                <p className="text-cyber-light/70">
                  Mid-size technology company with 500+ employees
                </p>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <RiskScore score={70} size="lg" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-cyber-blue/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-cyber-cyan mb-1">15</div>
                    <div className="text-sm text-cyber-light/70">Critical Issues</div>
                  </div>
                  <div className="bg-cyber-blue/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-cyber-cyan mb-1">42</div>
                    <div className="text-sm text-cyber-light/70">High Priority</div>
                  </div>
                </div>

                <div className="border-t border-cyber-blue/50 pt-6">
                  <h4 className="text-lg font-semibold text-cyber-light mb-3">
                    Key Findings:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-cyber-light/80">
                      <Icon name="alert" size={16} className="text-red-400 mr-3 flex-shrink-0" />
                      No multi-factor authentication
                    </li>
                    <li className="flex items-center text-cyber-light/80">
                      <Icon name="alert" size={16} className="text-red-400 mr-3 flex-shrink-0" />
                      Outdated security patches
                    </li>
                    <li className="flex items-center text-cyber-light/80">
                      <Icon name="alert" size={16} className="text-orange-400 mr-3 flex-shrink-0" />
                      Weak password policies
                    </li>
                    <li className="flex items-center text-cyber-light/80">
                      <Icon name="alert" size={16} className="text-orange-400 mr-3 flex-shrink-0" />
                      Limited employee training
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full">
              <h3 className="text-2xl font-bold text-cyber-light mb-6">
                Prioritized Recommendations
              </h3>

              {/* Recommendation Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {recommendations.map((rec, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedRecommendation(index)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedRecommendation === index
                        ? 'bg-cyber-cyan text-cyber-dark'
                        : 'bg-cyber-blue/30 text-cyber-light/70 hover:bg-cyber-blue/50'
                    }`}
                  >
                    {rec.title.split(' ').slice(0, 2).join(' ')}
                  </button>
                ))}
              </div>

              {/* Selected Recommendation Details */}
              <motion.div
                key={selectedRecommendation}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-xl font-bold text-cyber-light mb-2">
                    {recommendations[selectedRecommendation].title}
                  </h4>
                  <p className="text-cyber-light/80 leading-relaxed">
                    {recommendations[selectedRecommendation].description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-cyber-blue/20 rounded-lg p-3">
                    <div className="text-sm text-cyber-light/60 mb-1">Impact</div>
                    <div className={`font-semibold ${getImpactColor(recommendations[selectedRecommendation].impact)}`}>
                      {recommendations[selectedRecommendation].impact}
                    </div>
                  </div>
                  <div className="bg-cyber-blue/20 rounded-lg p-3">
                    <div className="text-sm text-cyber-light/60 mb-1">Effort</div>
                    <div className={`font-semibold ${getEffortColor(recommendations[selectedRecommendation].effort)}`}>
                      {recommendations[selectedRecommendation].effort}
                    </div>
                  </div>
                  <div className="bg-cyber-blue/20 rounded-lg p-3">
                    <div className="text-sm text-cyber-light/60 mb-1">Cost</div>
                    <div className="font-semibold text-cyber-light">
                      {recommendations[selectedRecommendation].cost}
                    </div>
                  </div>
                  <div className="bg-cyber-blue/20 rounded-lg p-3">
                    <div className="text-sm text-cyber-light/60 mb-1">Timeline</div>
                    <div className="font-semibold text-cyber-light">
                      {recommendations[selectedRecommendation].timeline}
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="mt-8 pt-6 border-t border-cyber-blue/50">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => alert('Demo: This would start the assessment process')}
                >
                  Start Your Assessment
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RealWorldScenario;
