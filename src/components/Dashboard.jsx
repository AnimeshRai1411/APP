import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import RiskScore from './RiskScore';
import Button from './Button';
import Icon from './Icon';
import scanService from '../services/scanService';
import authService from '../services/authService';

const Dashboard = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [latestScan, setLatestScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScanForm, setShowScanForm] = useState(false);
  const [scanFormData, setScanFormData] = useState({
    organizationName: '',
    targetDomain: ''
  });
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);

      // Load scan history
      const historyResult = await scanService.getScanHistory();
      if (historyResult.success) {
        setScanHistory(historyResult.data);
        
        // Get latest scan
        const latestResult = await scanService.getLatestScan();
        if (latestResult.success) {
          setLatestScan(latestResult.data);
        }
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScanSubmit = async (e) => {
    e.preventDefault();
    setScanning(true);

    try {
      const result = await scanService.performScan(
        scanFormData.organizationName,
        scanFormData.targetDomain
      );

      if (result.success) {
        setLatestScan(result.data);
        await loadDashboardData(); // Refresh data
        setShowScanForm(false);
        setScanFormData({ organizationName: '', targetDomain: '' });
      } else {
        alert('Scan failed: ' + result.error);
      }
    } catch (error) {
      alert('Scan failed: ' + error.message);
    } finally {
      setScanning(false);
    }
  };

  const riskStats = scanService.calculateRiskStats(scanHistory);
  const trendData = scanService.getRiskTrendData(scanHistory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyber-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cyber-light/70">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Header */}
      <motion.header
        className="bg-cyber-blue/20 border-b border-cyber-blue/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="shield" size={32} className="text-cyber-cyan" />
              <span className="text-xl font-bold gradient-text">CyberRisk</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-cyber-light font-medium">{user?.firstName} {user?.lastName}</p>
                <p className="text-cyber-light/70 text-sm">{user?.organization || 'No organization'}</p>
              </div>
              <Button variant="ghost" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-cyber-light mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-cyber-light/70">
            Monitor your organization's cybersecurity posture and track improvements over time.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              onClick={() => setShowScanForm(true)}
              className="flex items-center"
            >
              <Icon name="target" size={20} className="mr-2" />
              New Security Scan
            </Button>
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="flex items-center"
            >
              <Icon name="chart" size={20} className="mr-2" />
              Generate Report
            </Button>
          </div>
        </motion.div>

        {/* Scan Form Modal */}
        {showScanForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-cyber-blue rounded-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-xl font-bold text-cyber-light mb-4">New Security Scan</h3>
              <form onSubmit={handleScanSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cyber-light mb-2">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    value={scanFormData.organizationName}
                    onChange={(e) => setScanFormData({...scanFormData, organizationName: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-cyber-dark/50 border border-cyber-blue/50 rounded-lg text-cyber-light focus:outline-none focus:border-cyber-cyan"
                    placeholder="Enter organization name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cyber-light mb-2">
                    Target Domain
                  </label>
                  <input
                    type="text"
                    value={scanFormData.targetDomain}
                    onChange={(e) => setScanFormData({...scanFormData, targetDomain: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-cyber-dark/50 border border-cyber-blue/50 rounded-lg text-cyber-light focus:outline-none focus:border-cyber-cyan"
                    placeholder="example.com"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={scanning}
                    className="flex-1"
                  >
                    {scanning ? 'Scanning...' : 'Start Scan'}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowScanForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Latest Risk Score */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="text-center" glow>
              <h3 className="text-xl font-bold text-cyber-light mb-6">Current Risk Score</h3>
              {latestScan ? (
                <div>
                  <RiskScore score={latestScan.riskScore} size="lg" />
                  <div className="mt-4">
                    <p className="text-cyber-light/70 text-sm">
                      Last scan: {new Date(latestScan.scanDate).toLocaleDateString()}
                    </p>
                    <p className="text-cyber-light/70 text-sm">
                      {latestScan.organizationName}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-6xl text-cyber-light/30 mb-4">--</div>
                  <p className="text-cyber-light/70">No scans performed yet</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => setShowScanForm(true)}
                  >
                    Start Your First Scan
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Statistics */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <h3 className="text-xl font-bold text-cyber-light mb-6">Security Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-cyan mb-1">
                    {riskStats.totalScans}
                  </div>
                  <div className="text-sm text-cyber-light/70">Total Scans</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-cyan mb-1">
                    {riskStats.averageScore}
                  </div>
                  <div className="text-sm text-cyber-light/70">Avg Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-cyan mb-1">
                    {riskStats.highestScore}
                  </div>
                  <div className="text-sm text-cyber-light/70">Highest Risk</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-cyan mb-1">
                    {riskStats.lowestScore}
                  </div>
                  <div className="text-sm text-cyber-light/70">Lowest Risk</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Recent Scans */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <h3 className="text-xl font-bold text-cyber-light mb-6">Recent Scans</h3>
              {scanHistory.length > 0 ? (
                <div className="space-y-4">
                  {scanHistory.slice(0, 5).map((scan, index) => (
                    <div
                      key={scan.id}
                      className="flex items-center justify-between p-4 bg-cyber-blue/20 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyber-cyan to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-cyber-dark font-bold text-sm">
                            {scan.riskScore}
                          </span>
                        </div>
                        <div>
                          <p className="text-cyber-light font-medium">{scan.organizationName}</p>
                          <p className="text-cyber-light/70 text-sm">
                            {new Date(scan.scanDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-cyber-light font-medium">{scan.riskLevel}</p>
                        <p className="text-cyber-light/70 text-sm">{scan.targetDomain}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="chart" size={48} className="mx-auto mb-4 text-cyber-light/30" />
                  <p className="text-cyber-light/70">No scan history available</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => setShowScanForm(true)}
                  >
                    Perform Your First Scan
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
