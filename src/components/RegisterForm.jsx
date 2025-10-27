import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import Icon from './Icon';
import authService from '../services/authService';

const RegisterForm = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    organization: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const result = await authService.register(registerData);
      
      if (result.success) {
        onRegisterSuccess(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-effect rounded-xl p-8 cyber-glow">
        <div className="text-center mb-8">
          <Icon name="shield" size={48} className="mx-auto mb-4 text-cyber-cyan" />
          <h2 className="text-2xl font-bold text-cyber-light mb-2">
            Create Account
          </h2>
          <p className="text-cyber-light/70">
            Join CyberRisk and start assessing your cybersecurity posture
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <motion.div
              className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center">
                <Icon name="alert" size={16} className="mr-2" />
                {error}
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cyber-light mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-cyber-blue/30 border border-cyber-blue/50 rounded-lg text-cyber-light placeholder-cyber-light/50 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors duration-300"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cyber-light mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-cyber-blue/30 border border-cyber-blue/50 rounded-lg text-cyber-light placeholder-cyber-light/50 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors duration-300"
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-cyber-light mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-cyber-blue/30 border border-cyber-blue/50 rounded-lg text-cyber-light placeholder-cyber-light/50 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors duration-300"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyber-light mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-cyber-blue/30 border border-cyber-blue/50 rounded-lg text-cyber-light placeholder-cyber-light/50 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors duration-300"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyber-light mb-2">
              Organization
            </label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-cyber-blue/30 border border-cyber-blue/50 rounded-lg text-cyber-light placeholder-cyber-light/50 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors duration-300"
              placeholder="Your organization (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyber-light mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-cyber-blue/30 border border-cyber-blue/50 rounded-lg text-cyber-light placeholder-cyber-light/50 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors duration-300"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyber-light mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-cyber-blue/30 border border-cyber-blue/50 rounded-lg text-cyber-light placeholder-cyber-light/50 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors duration-300"
              placeholder="Confirm your password"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-cyber-dark border-t-transparent rounded-full animate-spin mr-2" />
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-cyber-light/70 text-sm">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-cyber-cyan hover:text-cyber-cyan/80 font-medium transition-colors duration-300"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterForm;
