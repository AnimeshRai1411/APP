package com.cyberrisk.model;

/**
 * Vulnerability Severity Enumeration
 * 
 * Defines the severity levels for security vulnerabilities.
 */
public enum Severity {
    LOW("Low", 1, "#10B981"),
    MEDIUM("Medium", 2, "#F59E0B"),
    HIGH("High", 3, "#EF4444"),
    CRITICAL("Critical", 4, "#DC2626");
    
    private final String displayName;
    private final int level;
    private final String color;
    
    Severity(String displayName, int level, String color) {
        this.displayName = displayName;
        this.level = level;
        this.color = color;
    }
    
    public String getDisplayName() {
        return displayName;
    }
    
    public int getLevel() {
        return level;
    }
    
    public String getColor() {
        return color;
    }
    
    @Override
    public String toString() {
        return displayName;
    }
}
