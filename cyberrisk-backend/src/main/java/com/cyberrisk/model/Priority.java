package com.cyberrisk.model;

/**
 * Recommendation Priority Enumeration
 * 
 * Defines the priority levels for security recommendations.
 */
public enum Priority {
    LOW("Low Priority", 1, "#10B981"),
    MEDIUM("Medium Priority", 2, "#F59E0B"),
    HIGH("High Priority", 3, "#EF4444"),
    CRITICAL("Critical Priority", 4, "#DC2626");
    
    private final String displayName;
    private final int level;
    private final String color;
    
    Priority(String displayName, int level, String color) {
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
