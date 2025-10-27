package com.cyberrisk.model;

/**
 * User Role Enumeration
 * 
 * Defines the available roles in the CyberRisk system.
 */
public enum Role {
    USER("User"),
    ADMIN("Administrator");
    
    private final String displayName;
    
    Role(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
    
    @Override
    public String toString() {
        return displayName;
    }
}
