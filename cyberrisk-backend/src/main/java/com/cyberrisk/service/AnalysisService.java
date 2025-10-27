package com.cyberrisk.service;

import com.cyberrisk.model.*;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Analysis Service
 * 
 * Business logic for risk analysis and scoring operations.
 */
@Service
public class AnalysisService {
    
    /**
     * Calculate risk score based on vulnerabilities
     */
    public int calculateRiskScore(List<Vulnerability> vulnerabilities) {
        if (vulnerabilities.isEmpty()) {
            return 0; // No vulnerabilities = perfect score
        }
        
        double totalScore = 0;
        double totalWeight = 0;
        
        for (Vulnerability vuln : vulnerabilities) {
            double weight = getSeverityWeight(vuln.getSeverity());
            double cvssScore = vuln.getCvssScore();
            
            // Apply additional weight for exploitable vulnerabilities
            if (vuln.isExploitable()) {
                weight *= 1.5;
            }
            
            totalScore += cvssScore * weight;
            totalWeight += weight;
        }
        
        if (totalWeight == 0) {
            return 0;
        }
        
        double averageScore = totalScore / totalWeight;
        
        // Convert to 0-100 scale (higher score = higher risk)
        int riskScore = (int) Math.round(averageScore * 10);
        
        // Ensure score is within bounds
        return Math.max(0, Math.min(100, riskScore));
    }
    
    /**
     * Get severity weight for scoring
     */
    private double getSeverityWeight(Severity severity) {
        return switch (severity) {
            case CRITICAL -> 4.0;
            case HIGH -> 3.0;
            case MEDIUM -> 2.0;
            case LOW -> 1.0;
        };
    }
    
    /**
     * Generate recommendations based on vulnerabilities and risk score
     */
    public List<Recommendation> generateRecommendations(List<Vulnerability> vulnerabilities, int riskScore) {
        List<Recommendation> recommendations = new ArrayList<>();
        
        // Generate recommendations based on vulnerabilities
        for (Vulnerability vuln : vulnerabilities) {
            Recommendation rec = createRecommendationFromVulnerability(vuln);
            recommendations.add(rec);
        }
        
        // Add general recommendations based on risk score
        if (riskScore >= 80) {
            recommendations.add(createRecommendation(
                "Immediate Security Review",
                "Conduct immediate comprehensive security review and implement emergency security measures",
                Priority.CRITICAL,
                "General Security",
                "Engage security experts for immediate assessment and remediation",
                "$50,000 - $100,000",
                "1-2 weeks",
                "Significant risk reduction"
            ));
        } else if (riskScore >= 60) {
            recommendations.add(createRecommendation(
                "Enhanced Security Monitoring",
                "Implement 24/7 security monitoring and incident response capabilities",
                Priority.HIGH,
                "Monitoring",
                "Deploy SIEM solution and establish SOC team",
                "$25,000 - $50,000",
                "2-4 weeks",
                "Improved threat detection"
            ));
        } else if (riskScore >= 40) {
            recommendations.add(createRecommendation(
                "Security Awareness Training",
                "Conduct comprehensive security awareness training for all employees",
                Priority.MEDIUM,
                "Training",
                "Implement regular security training program",
                "$5,000 - $15,000",
                "1-2 weeks",
                "Reduced human error risk"
            ));
        }
        
        // Sort by priority
        recommendations.sort((r1, r2) -> Integer.compare(r2.getPriority().getLevel(), r1.getPriority().getLevel()));
        
        return recommendations;
    }
    
    /**
     * Create recommendation from vulnerability
     */
    private Recommendation createRecommendationFromVulnerability(Vulnerability vuln) {
        Priority priority = mapSeverityToPriority(vuln.getSeverity());
        
        return createRecommendation(
            "Fix: " + vuln.getTitle(),
            vuln.getRemediation(),
            priority,
            vuln.getCategory(),
            generateImplementationSteps(vuln),
            estimateCost(vuln),
            estimateTime(vuln),
            "Addresses " + vuln.getSeverity().getDisplayName().toLowerCase() + " risk"
        );
    }
    
    /**
     * Create recommendation object
     */
    private Recommendation createRecommendation(String title, String description, Priority priority, 
                                              String category, String implementation, String cost, 
                                              String time, String impact) {
        Recommendation rec = new Recommendation();
        rec.setId(UUID.randomUUID().toString());
        rec.setTitle(title);
        rec.setDescription(description);
        rec.setPriority(priority);
        rec.setCategory(category);
        rec.setImplementation(implementation);
        rec.setEstimatedCost(cost);
        rec.setEstimatedTime(time);
        rec.setExpectedImpact(impact);
        rec.setImplemented(false);
        return rec;
    }
    
    /**
     * Map severity to priority
     */
    private Priority mapSeverityToPriority(Severity severity) {
        return switch (severity) {
            case CRITICAL -> Priority.CRITICAL;
            case HIGH -> Priority.HIGH;
            case MEDIUM -> Priority.MEDIUM;
            case LOW -> Priority.LOW;
        };
    }
    
    /**
     * Generate implementation steps
     */
    private String generateImplementationSteps(Vulnerability vuln) {
        StringBuilder steps = new StringBuilder();
        
        switch (vuln.getCategory().toLowerCase()) {
            case "authentication" -> {
                steps.append("1. Review current authentication policies\n");
                steps.append("2. Implement strong password requirements\n");
                steps.append("3. Enable multi-factor authentication\n");
                steps.append("4. Conduct user training\n");
                steps.append("5. Monitor and audit authentication events");
            }
            case "software" -> {
                steps.append("1. Inventory all software components\n");
                steps.append("2. Identify outdated versions\n");
                steps.append("3. Plan update schedule\n");
                steps.append("4. Test updates in staging environment\n");
                steps.append("5. Deploy updates with rollback plan");
            }
            case "network" -> {
                steps.append("1. Audit network configuration\n");
                steps.append("2. Implement encryption protocols\n");
                steps.append("3. Configure firewall rules\n");
                steps.append("4. Enable network monitoring\n");
                steps.append("5. Regular security assessments");
            }
            case "authorization" -> {
                steps.append("1. Review user permissions\n");
                steps.append("2. Implement least privilege principle\n");
                steps.append("3. Set up access reviews\n");
                steps.append("4. Configure role-based access control\n");
                steps.append("5. Monitor access patterns");
            }
            default -> {
                steps.append("1. Assess current implementation\n");
                steps.append("2. Develop remediation plan\n");
                steps.append("3. Implement security controls\n");
                steps.append("4. Test and validate\n");
                steps.append("5. Monitor and maintain");
            }
        }
        
        return steps.toString();
    }
    
    /**
     * Estimate cost based on vulnerability
     */
    private String estimateCost(Vulnerability vuln) {
        return switch (vuln.getSeverity()) {
            case CRITICAL -> "$25,000 - $75,000";
            case HIGH -> "$10,000 - $30,000";
            case MEDIUM -> "$5,000 - $15,000";
            case LOW -> "$1,000 - $5,000";
        };
    }
    
    /**
     * Estimate time based on vulnerability
     */
    private String estimateTime(Vulnerability vuln) {
        return switch (vuln.getSeverity()) {
            case CRITICAL -> "2-4 weeks";
            case HIGH -> "1-3 weeks";
            case MEDIUM -> "1-2 weeks";
            case LOW -> "3-7 days";
        };
    }
    
    /**
     * Analyze risk trends
     */
    public Map<String, Object> analyzeRiskTrends(List<ScanResult> scanResults) {
        Map<String, Object> analysis = new HashMap<>();
        
        if (scanResults.isEmpty()) {
            analysis.put("trend", "No data available");
            analysis.put("averageScore", 0);
            analysis.put("improvement", 0);
            return analysis;
        }
        
        // Sort by date
        scanResults.sort(Comparator.comparing(ScanResult::getScanDate));
        
        // Calculate average score
        double averageScore = scanResults.stream()
            .mapToInt(ScanResult::getRiskScore)
            .average()
            .orElse(0);
        
        // Calculate trend
        String trend = "Stable";
        if (scanResults.size() >= 2) {
            int latestScore = scanResults.get(scanResults.size() - 1).getRiskScore();
            int previousScore = scanResults.get(scanResults.size() - 2).getRiskScore();
            
            if (latestScore < previousScore - 5) {
                trend = "Improving";
            } else if (latestScore > previousScore + 5) {
                trend = "Deteriorating";
            }
        }
        
        // Calculate improvement percentage
        double improvement = 0;
        if (scanResults.size() >= 2) {
            int firstScore = scanResults.get(0).getRiskScore();
            int lastScore = scanResults.get(scanResults.size() - 1).getRiskScore();
            improvement = ((double) (firstScore - lastScore) / firstScore) * 100;
        }
        
        analysis.put("trend", trend);
        analysis.put("averageScore", Math.round(averageScore));
        analysis.put("improvement", Math.round(improvement));
        analysis.put("totalScans", scanResults.size());
        
        return analysis;
    }
}
