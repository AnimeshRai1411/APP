import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import WhyItMatters from './components/WhyItMatters';
import HowItWorks from './components/HowItWorks';
import RealWorldScenario from './components/RealWorldScenario';
import OurAdvantages from './components/OurAdvantages';
import TechStack from './components/TechStack';
import UseCases from './components/UseCases';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import authService from './services/authService';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already authenticated
    if (authService.isAuthenticated()) {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Scroll to dashboard or show scan form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowLogin(true);
    }
  };

  // Show authentication forms
  if (showLogin || showRegister) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark via-cyber-blue/20 to-cyber-dark" />
        <div className="relative z-10 w-full max-w-md">
          {showLogin ? (
            <LoginForm
              onLoginSuccess={handleLoginSuccess}
              onSwitchToRegister={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
            />
          ) : (
            <RegisterForm
              onRegisterSuccess={handleRegisterSuccess}
              onSwitchToLogin={() => {
                setShowRegister(false);
                setShowLogin(true);
              }}
            />
          )}
        </div>
      </div>
    );
  }

  // Show dashboard if authenticated
  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  // Show landing page
  return (
    <div className="App min-h-screen bg-cyber-dark text-cyber-light">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-cyber-dark/90 backdrop-blur-sm border-b border-cyber-blue/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyber-cyan to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-cyber-dark font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold gradient-text">CyberRisk</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-cyber-light/70 hover:text-cyber-cyan transition-colors duration-300">
                How It Works
              </a>
              <a href="#scenario" className="text-cyber-light/70 hover:text-cyber-cyan transition-colors duration-300">
                Demo
              </a>
              <a href="#use-cases" className="text-cyber-light/70 hover:text-cyber-cyan transition-colors duration-300">
                Use Cases
              </a>
              <button 
                onClick={handleGetStarted}
                className="px-6 py-2 bg-gradient-to-r from-cyber-cyan to-blue-500 text-cyber-dark font-semibold rounded-lg hover:from-cyber-cyan/80 hover:to-blue-500/80 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main>
        <Hero />
        <WhyItMatters />
        <HowItWorks />
        <RealWorldScenario />
        <OurAdvantages />
        <TechStack />
        <UseCases />
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-cyber-cyan to-blue-500 text-cyber-dark rounded-full shadow-lg shadow-cyber-cyan/25 hover:shadow-cyber-cyan/40 transition-all duration-300 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  );
}

export default App;
