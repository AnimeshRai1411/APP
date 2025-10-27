import { scanAPI } from './api';

class ScanService {
  // Perform vulnerability scan
  async performScan(organizationName, targetDomain, targetIp = null) {
    try {
      const scanData = {
        organizationName,
        targetDomain,
        targetIp,
        scanType: 'comprehensive'
      };
      
      const response = await scanAPI.performScan(scanData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Scan failed' 
      };
    }
  }

  // Get scan result by ID
  async getScanResult(scanId) {
    try {
      const response = await scanAPI.getScanResult(scanId);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to retrieve scan result' 
      };
    }
  }

  // Get scan history
  async getScanHistory() {
    try {
      const response = await scanAPI.getScanHistory();
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to retrieve scan history' 
      };
    }
  }

  // Get latest scan result
  async getLatestScan() {
    try {
      const result = await this.getScanHistory();
      if (result.success && result.data.length > 0) {
        // Sort by scan date and get the latest
        const sortedScans = result.data.sort((a, b) => 
          new Date(b.scanDate) - new Date(a.scanDate)
        );
        return { success: true, data: sortedScans[0] };
      }
      return { success: false, error: 'No scans found' };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Failed to get latest scan' 
      };
    }
  }

  // Get risk trend data
  getRiskTrendData(scanHistory) {
    if (!scanHistory || scanHistory.length === 0) {
      return [];
    }

    return scanHistory
      .sort((a, b) => new Date(a.scanDate) - new Date(b.scanDate))
      .map(scan => ({
        date: new Date(scan.scanDate).toLocaleDateString(),
        score: scan.riskScore,
        riskLevel: scan.riskLevel,
        organization: scan.organizationName
      }));
  }

  // Calculate risk statistics
  calculateRiskStats(scanHistory) {
    if (!scanHistory || scanHistory.length === 0) {
      return {
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        totalScans: 0,
        riskLevelDistribution: {}
      };
    }

    const scores = scanHistory.map(scan => scan.riskScore);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);

    // Calculate risk level distribution
    const riskLevelDistribution = scanHistory.reduce((acc, scan) => {
      const level = scan.riskLevel;
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    return {
      averageScore: Math.round(averageScore),
      highestScore,
      lowestScore,
      totalScans: scanHistory.length,
      riskLevelDistribution
    };
  }
}

export default new ScanService();
