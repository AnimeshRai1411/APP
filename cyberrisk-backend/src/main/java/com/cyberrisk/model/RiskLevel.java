package com.cyberrisk.model;

/**
 * Risk Level Enumeration
 * 
 * Defines the different levels of cybersecurity risk.
 */
public enum RiskLevel {
    LOW("Low Risk", 0, 39, "#10B981"),
    MEDIUM("Medium Risk", 40, 59, "#F59E0B"),
    HIGH("High Risk", 60, 79, "#EF4444"),
    CRITICAL("Critical Risk", 80, 100, "#DC2626");
    
    private final String displayName;
    private final int minScore;
    private final int maxScore;
    private final String color;
    
    RiskLevel(String displayName, int minScore, int maxScore, String color) {
        this.displayName = displayName;
        this.minScore = minScore;
        this.maxScore = maxScore;
        this.color = color;
    }
    
    public String getDisplayName() {
        return displayName;
    }
    
    public int getMinScore() {
        return minScore;
    }
    
    public int getMaxScore() {
        return maxScore;
    }
    
    public String getColor() {
        return color;
    }
    
    public static RiskLevel fromScore(int score) {
        for (RiskLevel level : values()) {
            if (score >= level.minScore && score <= level.maxScore) {
                return level;
            }
        }
        return CRITICAL; // Default to critical if score is out of range
    }
    
    @Override
    public String toString() {
        return displayName;
    }
}
