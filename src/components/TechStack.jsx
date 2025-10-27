import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import Icon from './Icon';

const TechStack = () => {
  const technologies = [
    {
      category: 'Backend',
      icon: 'cpu',
      color: 'from-orange-500 to-red-500',
      technologies: [
        { name: 'Java', description: 'Enterprise-grade backend development' },
        { name: 'Spring Boot', description: 'Rapid application development framework' },
        { name: 'Spring Security', description: 'Comprehensive security framework' },
        { name: 'PostgreSQL', description: 'Robust relational database' }
      ]
    },
    {
      category: 'AI & Analytics',
      icon: 'chart',
      color: 'from-purple-500 to-pink-500',
      technologies: [
        { name: 'Machine Learning', description: 'Advanced risk scoring algorithms' },
        { name: 'Natural Language Processing', description: 'Automated report generation' },
        { name: 'Predictive Analytics', description: 'Threat prediction and modeling' },
        { name: 'Data Visualization', description: 'Interactive dashboards and reports' }
      ]
    },
    {
      category: 'Security Tools',
      icon: 'shield',
      color: 'from-cyber-cyan to-blue-500',
      technologies: [
        { name: 'Vulnerability Scanners', description: 'Comprehensive security scanning' },
        { name: 'Threat Intelligence', description: 'Real-time threat data feeds' },
        { name: 'Compliance Frameworks', description: 'SOC2, ISO27001, NIST support' },
        { name: 'Penetration Testing', description: 'Automated security testing' }
      ]
    },
    {
      category: 'Infrastructure',
      icon: 'database',
      color: 'from-green-500 to-teal-500',
      technologies: [
        { name: 'AWS Cloud', description: 'Scalable cloud infrastructure' },
        { name: 'Docker', description: 'Containerized deployment' },
        { name: 'Kubernetes', description: 'Orchestration and scaling' },
        { name: 'Redis', description: 'High-performance caching' }
      ]
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
            <span className="gradient-text">Technology Stack</span>
          </h2>
          <p className="text-xl text-cyber-light/80 max-w-3xl mx-auto">
            Built on enterprise-grade technologies to deliver reliable, scalable, and secure cybersecurity assessments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technologies.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full" glow>
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                    <Icon name={category.icon} size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-cyber-light">
                    {category.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-cyber-blue/20 hover:bg-cyber-blue/30 transition-colors duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: techIndex * 0.1 }}
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${category.color} rounded-full mt-2 flex-shrink-0`} />
                      <div>
                        <h4 className="font-semibold text-cyber-light mb-1">
                          {tech.name}
                        </h4>
                        <p className="text-sm text-cyber-light/70">
                          {tech.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="text-center">
            <h3 className="text-2xl font-bold text-cyber-light mb-8">
              System Architecture
            </h3>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Architecture visualization */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Frontend */}
                <motion.div
                  className="bg-gradient-to-br from-cyber-cyan/20 to-blue-400/20 rounded-xl p-6 border border-cyber-cyan/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon name="eye" size={32} className="mx-auto mb-3 text-cyber-cyan" />
                  <h4 className="font-bold text-cyber-light mb-2">Frontend</h4>
                  <p className="text-sm text-cyber-light/70">React + TailwindCSS</p>
                </motion.div>

                {/* Arrow */}
                <div className="hidden md:flex justify-center">
                  <motion.div
                    className="w-8 h-8 border-r-2 border-b-2 border-cyber-cyan transform rotate-45"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                {/* Backend */}
                <motion.div
                  className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-400/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon name="cpu" size={32} className="mx-auto mb-3 text-orange-400" />
                  <h4 className="font-bold text-cyber-light mb-2">Backend</h4>
                  <p className="text-sm text-cyber-light/70">Java + Spring Boot</p>
                </motion.div>
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <motion.div
                  className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-400/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon name="chart" size={32} className="mx-auto mb-3 text-purple-400" />
                  <h4 className="font-bold text-cyber-light mb-2">AI Engine</h4>
                  <p className="text-sm text-cyber-light/70">ML + Analytics</p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl p-6 border border-green-400/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon name="database" size={32} className="mx-auto mb-3 text-green-400" />
                  <h4 className="font-bold text-cyber-light mb-2">Infrastructure</h4>
                  <p className="text-sm text-cyber-light/70">AWS + Kubernetes</p>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
