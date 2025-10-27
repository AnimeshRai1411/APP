package com.cyberrisk.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Scan Result Entity Model
 * 
 * Represents the result of a cybersecurity vulnerability scan
 * performed on an organization's infrastructure.
 */
@Entity
@Table(name = "scan_results")
public class ScanResult {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    
    private String organizationName;
    private String targetDomain;
    private String targetIp;
    private LocalDateTime scanDate;
    private ScanStatus status;
    private int riskScore;
    private RiskLevel riskLevel;
    @ElementCollection
    @CollectionTable(name = "scan_vulnerabilities", joinColumns = @JoinColumn(name = "scan_id"))
    private List<Vulnerability> vulnerabilities;
    
    @ElementCollection
    @CollectionTable(name = "scan_recommendations", joinColumns = @JoinColumn(name = "scan_id"))
    private List<Recommendation> recommendations;
    
    @ElementCollection
    @CollectionTable(name = "scan_metadata", joinColumns = @JoinColumn(name = "scan_id"))
    @MapKeyColumn(name = "metadata_key")
    @Column(name = "metadata_value")
    private Map<String, String> scanMetadata;
    private String scanSummary;
    
    // Constructors
    public ScanResult() {
        this.scanDate = LocalDateTime.now();
        this.status = ScanStatus.PENDING;
    }
    
    public ScanResult(User user, String organizationName, String targetDomain) {
        this();
        this.user = user;
        this.organizationName = organizationName;
        this.targetDomain = targetDomain;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
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
        this.riskLevel = calculateRiskLevel(riskScore);
    }
    
    public RiskLevel getRiskLevel() {
        return riskLevel;
    }
    
    public void setRiskLevel(RiskLevel riskLevel) {
        this.riskLevel = riskLevel;
    }
    
    public List<Vulnerability> getVulnerabilities() {
        return vulnerabilities;
    }
    
    public void setVulnerabilities(List<Vulnerability> vulnerabilities) {
        this.vulnerabilities = vulnerabilities;
    }
    
    public List<Recommendation> getRecommendations() {
        return recommendations;
    }
    
    public void setRecommendations(List<Recommendation> recommendations) {
        this.recommendations = recommendations;
    }
    
    public Map<String, String> getScanMetadata() {
        return scanMetadata;
    }
    
    public void setScanMetadata(Map<String, String> scanMetadata) {
        this.scanMetadata = scanMetadata;
    }
    
    public String getScanSummary() {
        return scanSummary;
    }
    
    public void setScanSummary(String scanSummary) {
        this.scanSummary = scanSummary;
    }
    
    // Utility methods
    private RiskLevel calculateRiskLevel(int score) {
        if (score >= 80) return RiskLevel.CRITICAL;
        if (score >= 60) return RiskLevel.HIGH;
        if (score >= 40) return RiskLevel.MEDIUM;
        return RiskLevel.LOW;
    }
    
    public boolean isCompleted() {
        return status == ScanStatus.COMPLETED;
    }
    
    public boolean isFailed() {
        return status == ScanStatus.FAILED;
    }
    
    @Override
    public String toString() {
        return "ScanResult{" +
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
