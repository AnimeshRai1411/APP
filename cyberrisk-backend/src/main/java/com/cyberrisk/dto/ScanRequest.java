package com.cyberrisk.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Scan Request DTO
 * 
 * Data transfer object for vulnerability scan requests.
 */
public class ScanRequest {
    
    @NotBlank(message = "Organization name is required")
    private String organizationName;
    
    private String targetDomain;
    private String targetIp;
    private String scanType;
    
    // Constructors
    public ScanRequest() {}
    
    public ScanRequest(String organizationName, String targetDomain) {
        this.organizationName = organizationName;
        this.targetDomain = targetDomain;
    }
    
    // Getters and Setters
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
    
    public String getScanType() {
        return scanType;
    }
    
    public void setScanType(String scanType) {
        this.scanType = scanType;
    }
    
    @Override
    public String toString() {
        return "ScanRequest{" +
                "organizationName='" + organizationName + '\'' +
                ", targetDomain='" + targetDomain + '\'' +
                ", targetIp='" + targetIp + '\'' +
                ", scanType='" + scanType + '\'' +
                '}';
    }
}
