package com.cyberrisk.service;

import com.cyberrisk.dto.ScanRequest;
import com.cyberrisk.dto.ScanResponse;
import com.cyberrisk.dto.VulnerabilityDto;
import com.cyberrisk.dto.RecommendationDto;
import com.cyberrisk.model.*;
import com.cyberrisk.repository.ScanResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Scan Service
 * 
 * Business logic for vulnerability scanning operations.
 */
@Service
public class ScanService {
    
    @Autowired
    private ScanResultRepository scanResultRepository;
    
    @Autowired
    private AnalysisService analysisService;
    
    /**
     * Perform vulnerability scan
     */
    public ScanResponse performScan(ScanRequest scanRequest, User user) {
        // Create scan result
        ScanResult scanResult = new ScanResult(user, scanRequest.getOrganizationName(), scanRequest.getTargetDomain());
        scanResult.setTargetIp(scanRequest.getTargetIp());
        scanResult.setStatus(ScanStatus.IN_PROGRESS);
        
        // Save initial scan result
        scanResult = scanResultRepository.save(scanResult);
        
        // Simulate scan process (in real implementation, this would be async)
        try {
            // Simulate scan delay
            Thread.sleep(2000);
            
            // Generate simulated vulnerabilities
            List<Vulnerability> vulnerabilities = generateSimulatedVulnerabilities(scanRequest);
            scanResult.setVulnerabilities(vulnerabilities);
            
            // Perform risk analysis
            int riskScore = analysisService.calculateRiskScore(vulnerabilities);
            scanResult.setRiskScore(riskScore);
            
            // Generate recommendations
            List<Recommendation> recommendations = analysisService.generateRecommendations(vulnerabilities, riskScore);
            scanResult.setRecommendations(recommendations);
            
            // Generate scan summary
            String summary = generateScanSummary(scanResult);
            scanResult.setScanSummary(summary);
            
            // Update status
            scanResult.setStatus(ScanStatus.COMPLETED);
            
            // Save final result
            scanResult = scanResultRepository.save(scanResult);
            
            // Convert to response DTO
            return convertToScanResponse(scanResult);
            
        } catch (Exception e) {
            scanResult.setStatus(ScanStatus.FAILED);
            scanResultRepository.save(scanResult);
            throw new RuntimeException("Scan failed: " + e.getMessage());
        }
    }
    
    /**
     * Generate simulated vulnerabilities for demo purposes
     */
    private List<Vulnerability> generateSimulatedVulnerabilities(ScanRequest scanRequest) {
        List<Vulnerability> vulnerabilities = new ArrayList<>();
        Random random = new Random();
        
        // Simulate different types of vulnerabilities based on organization
        String orgName = scanRequest.getOrganizationName().toLowerCase();
        
        // Common vulnerabilities
        if (random.nextBoolean()) {
            vulnerabilities.add(createVulnerability(
                "Weak Password Policy",
                "Organization uses weak password requirements (minimum 6 characters, no complexity requirements)",
                Severity.HIGH,
                "Authentication",
                "CVE-2023-0001",
                "User Management System",
                "Implement strong password policy with minimum 12 characters, complexity requirements, and regular rotation",
                7.5,
                true
            ));
        }
        
        if (random.nextBoolean()) {
            vulnerabilities.add(createVulnerability(
                "Missing Multi-Factor Authentication",
                "Critical systems lack multi-factor authentication, increasing risk of unauthorized access",
                Severity.CRITICAL,
                "Authentication",
                "CVE-2023-0002",
                "Authentication System",
                "Enable MFA for all user accounts, especially administrative and privileged accounts",
                9.2,
                true
            ));
        }
        
        if (random.nextBoolean()) {
            vulnerabilities.add(createVulnerability(
                "Outdated Software Components",
                "Multiple software components are running outdated versions with known security vulnerabilities",
                Severity.HIGH,
                "Software",
                "CVE-2023-0003",
                "Web Application",
                "Update all software components to latest stable versions and implement automated patch management",
                8.1,
                true
            ));
        }
        
        if (random.nextBoolean()) {
            vulnerabilities.add(createVulnerability(
                "Unencrypted Data Transmission",
                "Sensitive data is transmitted over unencrypted channels (HTTP instead of HTTPS)",
                Severity.MEDIUM,
                "Network",
                "CVE-2023-0004",
                "Web Server",
                "Implement SSL/TLS encryption for all data transmission and enforce HTTPS",
                6.3,
                false
            ));
        }
        
        if (random.nextBoolean()) {
            vulnerabilities.add(createVulnerability(
                "Insufficient Access Controls",
                "User permissions are overly permissive, allowing access to resources beyond job requirements",
                Severity.MEDIUM,
                "Authorization",
                "CVE-2023-0005",
                "Access Control System",
                "Implement principle of least privilege and regular access reviews",
                5.8,
                false
            ));
        }
        
        // Add organization-specific vulnerabilities
        if (orgName.contains("tech") || orgName.contains("software")) {
            vulnerabilities.add(createVulnerability(
                "Insecure API Endpoints",
                "API endpoints lack proper authentication and rate limiting",
                Severity.HIGH,
                "API Security",
                "CVE-2023-0006",
                "API Gateway",
                "Implement API authentication, rate limiting, and input validation",
                7.8,
                true
            ));
        }
        
        if (orgName.contains("bank") || orgName.contains("financial")) {
            vulnerabilities.add(createVulnerability(
                "PCI DSS Compliance Issues",
                "Payment card data handling does not meet PCI DSS requirements",
                Severity.CRITICAL,
                "Compliance",
                "CVE-2023-0007",
                "Payment System",
                "Implement PCI DSS compliant data handling and encryption",
                9.5,
                true
            ));
        }
        
        if (orgName.contains("health") || orgName.contains("medical")) {
            vulnerabilities.add(createVulnerability(
                "HIPAA Compliance Violations",
                "Protected health information (PHI) is not properly secured according to HIPAA requirements",
                Severity.CRITICAL,
                "Compliance",
                "CVE-2023-0008",
                "Health Records System",
                "Implement HIPAA compliant data protection and access controls",
                9.8,
                true
            ));
        }
        
        return vulnerabilities;
    }
    
    /**
     * Create vulnerability object
     */
    private Vulnerability createVulnerability(String title, String description, Severity severity, 
                                            String category, String cveId, String affectedSystem, 
                                            String remediation, double cvssScore, boolean exploitable) {
        Vulnerability vuln = new Vulnerability();
        vuln.setId(UUID.randomUUID().toString());
        vuln.setTitle(title);
        vuln.setDescription(description);
        vuln.setSeverity(severity);
        vuln.setCategory(category);
        vuln.setCveId(cveId);
        vuln.setAffectedSystem(affectedSystem);
        vuln.setRemediation(remediation);
        vuln.setCvssScore(cvssScore);
        vuln.setExploitable(exploitable);
        return vuln;
    }
    
    /**
     * Generate scan summary
     */
    private String generateScanSummary(ScanResult scanResult) {
        StringBuilder summary = new StringBuilder();
        summary.append("Cybersecurity Assessment Summary for ").append(scanResult.getOrganizationName()).append("\n\n");
        summary.append("Scan Date: ").append(scanResult.getScanDate()).append("\n");
        summary.append("Target: ").append(scanResult.getTargetDomain()).append("\n");
        summary.append("Risk Score: ").append(scanResult.getRiskScore()).append("/100 (").append(scanResult.getRiskLevel()).append(")\n\n");
        
        summary.append("Vulnerabilities Found: ").append(scanResult.getVulnerabilities().size()).append("\n");
        summary.append("Critical: ").append(countVulnerabilitiesBySeverity(scanResult.getVulnerabilities(), Severity.CRITICAL)).append("\n");
        summary.append("High: ").append(countVulnerabilitiesBySeverity(scanResult.getVulnerabilities(), Severity.HIGH)).append("\n");
        summary.append("Medium: ").append(countVulnerabilitiesBySeverity(scanResult.getVulnerabilities(), Severity.MEDIUM)).append("\n");
        summary.append("Low: ").append(countVulnerabilitiesBySeverity(scanResult.getVulnerabilities(), Severity.LOW)).append("\n\n");
        
        summary.append("Recommendations: ").append(scanResult.getRecommendations().size()).append("\n");
        summary.append("Priority Actions: ").append(countRecommendationsByPriority(scanResult.getRecommendations(), Priority.CRITICAL)).append("\n");
        
        return summary.toString();
    }
    
    /**
     * Count vulnerabilities by severity
     */
    private long countVulnerabilitiesBySeverity(List<Vulnerability> vulnerabilities, Severity severity) {
        return vulnerabilities.stream().filter(v -> v.getSeverity() == severity).count();
    }
    
    /**
     * Count recommendations by priority
     */
    private long countRecommendationsByPriority(List<Recommendation> recommendations, Priority priority) {
        return recommendations.stream().filter(r -> r.getPriority() == priority).count();
    }
    
    /**
     * Convert ScanResult to ScanResponse DTO
     */
    private ScanResponse convertToScanResponse(ScanResult scanResult) {
        ScanResponse response = new ScanResponse(
            scanResult.getId().toString(),
            scanResult.getOrganizationName(),
            scanResult.getTargetDomain(),
            scanResult.getScanDate(),
            scanResult.getStatus(),
            scanResult.getRiskScore(),
            scanResult.getRiskLevel()
        );
        
        response.setTargetIp(scanResult.getTargetIp());
        response.setScanSummary(scanResult.getScanSummary());
        
        // Convert vulnerabilities
        List<VulnerabilityDto> vulnerabilityDtos = scanResult.getVulnerabilities().stream()
            .map(this::convertToVulnerabilityDto)
            .toList();
        response.setVulnerabilities(vulnerabilityDtos);
        
        // Convert recommendations
        List<RecommendationDto> recommendationDtos = scanResult.getRecommendations().stream()
            .map(this::convertToRecommendationDto)
            .toList();
        response.setRecommendations(recommendationDtos);
        
        return response;
    }
    
    /**
     * Convert Vulnerability to VulnerabilityDto
     */
    private VulnerabilityDto convertToVulnerabilityDto(Vulnerability vulnerability) {
        VulnerabilityDto dto = new VulnerabilityDto();
        dto.setId(vulnerability.getId());
        dto.setTitle(vulnerability.getTitle());
        dto.setDescription(vulnerability.getDescription());
        dto.setSeverity(vulnerability.getSeverity());
        dto.setCategory(vulnerability.getCategory());
        dto.setCveId(vulnerability.getCveId());
        dto.setAffectedSystem(vulnerability.getAffectedSystem());
        dto.setRemediation(vulnerability.getRemediation());
        dto.setCvssScore(vulnerability.getCvssScore());
        dto.setExploitable(vulnerability.isExploitable());
        return dto;
    }
    
    /**
     * Convert Recommendation to RecommendationDto
     */
    private RecommendationDto convertToRecommendationDto(Recommendation recommendation) {
        RecommendationDto dto = new RecommendationDto();
        dto.setId(recommendation.getId());
        dto.setTitle(recommendation.getTitle());
        dto.setDescription(recommendation.getDescription());
        dto.setPriority(recommendation.getPriority());
        dto.setCategory(recommendation.getCategory());
        dto.setImplementation(recommendation.getImplementation());
        dto.setEstimatedCost(recommendation.getEstimatedCost());
        dto.setEstimatedTime(recommendation.getEstimatedTime());
        dto.setExpectedImpact(recommendation.getExpectedImpact());
        dto.setImplemented(recommendation.isImplemented());
        return dto;
    }
    
    /**
     * Get scan result by ID
     */
    public ScanResponse getScanResult(String scanId) {
        ScanResult scanResult = scanResultRepository.findById(Long.parseLong(scanId))
            .orElseThrow(() -> new RuntimeException("Scan result not found: " + scanId));
        
        return convertToScanResponse(scanResult);
    }
    
    /**
     * Get scan results by user
     */
    public List<ScanResponse> getScanResultsByUser(User user) {
        List<ScanResult> scanResults = scanResultRepository.findByUser(user);
        return scanResults.stream()
            .map(this::convertToScanResponse)
            .toList();
    }
}
