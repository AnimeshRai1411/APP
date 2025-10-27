package com.cyberrisk.dto;

import com.cyberrisk.model.RiskLevel;
import com.cyberrisk.model.ScanStatus;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Scan Response DTO
 * 
 * Data transfer object for scan responses.
 */
public class ScanResponse {
    
    private String id;
    private String organizationName;
    private String targetDomain;
    private String targetIp;
    private LocalDateTime scanDate;
    private ScanStatus status;
    private int riskScore;
    private RiskLevel riskLevel;
    private List<VulnerabilityDto> vulnerabilities;
    private List<RecommendationDto> recommendations;
    private String scanSummary;
    
    // Constructors
    public ScanResponse() {}
    
    public ScanResponse(String id, String organizationName, String targetDomain, 
                       LocalDateTime scanDate, ScanStatus status, int riskScore, RiskLevel riskLevel) {
        this.id = id;
        this.organizationName = organizationName;
        this.targetDomain = targetDomain;
        this.scanDate = scanDate;
        this.status = status;
        this.riskScore = riskScore;
        this.riskLevel = riskLevel;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getOrganizationName() {
        return organizationName;
    }
    
    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }
    
    public String getTargetDomain() {
        return targetDomain;
    }
    
    public void setTargetDomain(String targetDomain) {
        this.targetDomain = targetDomain;
    }
    
    public String getTargetIp() {
        return targetIp;
    }
    
    public void setTargetIp(String targetIp) {
        this.targetIp = targetIp;
    }
    
    public LocalDateTime getScanDate() {
        return scanDate;
    }
    
    public void setScanDate(LocalDateTime scanDate) {
        this.scanDate = scanDate;
    }
    
    public ScanStatus getStatus() {
        return status;
    }
    
    public void setStatus(ScanStatus status) {
        this.status = status;
    }
    
    public int getRiskScore() {
        return riskScore;
    }
    
    public void setRiskScore(int riskScore) {
        this.riskScore = riskScore;
    }
    
    public RiskLevel getRiskLevel() {
        return riskLevel;
    }
    
    public void setRiskLevel(RiskLevel riskLevel) {
        this.riskLevel = riskLevel;
    }
    
    public List<VulnerabilityDto> getVulnerabilities() {
        return vulnerabilities;
    }
    
    public void setVulnerabilities(List<VulnerabilityDto> vulnerabilities) {
        this.vulnerabilities = vulnerabilities;
    }
    
    public List<RecommendationDto> getRecommendations() {
        return recommendations;
    }
    
    public void setRecommendations(List<RecommendationDto> recommendations) {
        this.recommendations = recommendations;
    }
    
    public String getScanSummary() {
        return scanSummary;
    }
    
    public void setScanSummary(String scanSummary) {
        this.scanSummary = scanSummary;
    }
    
    @Override
    public String toString() {
        return "ScanResponse{" +
                "id='" + id + '\'' +
                ", organizationName='" + organizationName + '\'' +
                ", targetDomain='" + targetDomain + '\'' +
                ", scanDate=" + scanDate +
                ", status=" + status +
                ", riskScore=" + riskScore +
                ", riskLevel=" + riskLevel +
                '}';
    }
}
