package com.cyberrisk.dto;

import com.cyberrisk.model.Priority;

/**
 * Recommendation DTO
 * 
 * Data transfer object for security recommendations.
 */
public class RecommendationDto {
    
    private String id;
    private String title;
    private String description;
    private Priority priority;
    private String category;
    private String implementation;
    private String estimatedCost;
    private String estimatedTime;
    private String expectedImpact;
    private boolean isImplemented;
    
    // Constructors
    public RecommendationDto() {}
    
    public RecommendationDto(String title, String description, Priority priority, String category) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.category = category;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Priority getPriority() {
        return priority;
    }
    
    public void setPriority(Priority priority) {
        this.priority = priority;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getImplementation() {
        return implementation;
    }
    
    public void setImplementation(String implementation) {
        this.implementation = implementation;
    }
    
    public String getEstimatedCost() {
        return estimatedCost;
    }
    
    public void setEstimatedCost(String estimatedCost) {
        this.estimatedCost = estimatedCost;
    }
    
    public String getEstimatedTime() {
        return estimatedTime;
    }
    
    public void setEstimatedTime(String estimatedTime) {
        this.estimatedTime = estimatedTime;
    }
    
    public String getExpectedImpact() {
        return expectedImpact;
    }
    
    public void setExpectedImpact(String expectedImpact) {
        this.expectedImpact = expectedImpact;
    }
    
    public boolean isImplemented() {
        return isImplemented;
    }
    
    public void setImplemented(boolean implemented) {
        isImplemented = implemented;
    }
    
    @Override
    public String toString() {
        return "RecommendationDto{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", priority=" + priority +
                ", category='" + category + '\'' +
                ", estimatedCost='" + estimatedCost + '\'' +
                ", estimatedTime='" + estimatedTime + '\'' +
                '}';
    }
}
