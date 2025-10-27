import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import Icon from './Icon';
import authService from '../services/authService';

const LoginForm = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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

    try {
      const result = await authService.login(formData.username, formData.password);
      
      if (result.success) {
        onLoginSuccess(result.data);
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
            Welcome Back
          </h2>
          <p className="text-cyber-light/70">
            Sign in to access your CyberRisk dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your username"
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
              placeholder="Enter your password"
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
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-cyber-light/70 text-sm">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-cyber-cyan hover:text-cyber-cyan/80 font-medium transition-colors duration-300"
            >
              Sign up here
            </button>
          </p>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-cyber-blue/20 rounded-lg border border-cyber-blue/30">
          <h4 className="text-sm font-medium text-cyber-light mb-2">Demo Credentials:</h4>
          <div className="text-xs text-cyber-light/70 space-y-1">
            <div><strong>Admin:</strong> admin / admin123</div>
            <div><strong>User:</strong> user / user123</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;
