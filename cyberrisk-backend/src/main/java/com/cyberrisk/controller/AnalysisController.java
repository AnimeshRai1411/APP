package com.cyberrisk.controller;

import com.cyberrisk.model.User;
import com.cyberrisk.service.AnalysisService;
import com.cyberrisk.service.ScanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Analysis Controller
 * 
 * Handles risk analysis and reporting endpoints.
 */
@RestController
@RequestMapping("/analyze")
@CrossOrigin(origins = "*")
public class AnalysisController {
    
    @Autowired
    private AnalysisService analysisService;
    
    @Autowired
    private ScanService scanService;
    
    /**
     * Get risk analysis for user
     */
    @GetMapping("/risk-analysis")
    public ResponseEntity<?> getRiskAnalysis(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            // Get user's scan history
            var scanResults = scanService.getScanResultsByUser(user);
            
            // Perform basic analysis with DTOs
            Map<String, Object> analysis = new HashMap<>();
            
            if (scanResults.isEmpty()) {
                analysis.put("trend", "No data available");
                analysis.put("averageScore", 0);
                analysis.put("improvement", 0);
            } else {
                // Calculate average score
                double averageScore = scanResults.stream()
                    .mapToInt(com.cyberrisk.dto.ScanResponse::getRiskScore)
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
                
                analysis.put("trend", trend);
                analysis.put("averageScore", Math.round(averageScore));
                analysis.put("totalScans", scanResults.size());
            }
            
            // Add user-specific data
            analysis.put("userId", user.getId());
            analysis.put("username", user.getUsername());
            analysis.put("organization", user.getOrganization());
            
            return ResponseEntity.ok(analysis);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to perform risk analysis: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get risk score summary
     */
    @GetMapping("/score-summary")
    public ResponseEntity<?> getScoreSummary(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            // Get latest scan result
            var scanResults = scanService.getScanResultsByUser(user);
            
            Map<String, Object> summary = new HashMap<>();
            
            if (!scanResults.isEmpty()) {
                var latestScan = scanResults.get(scanResults.size() - 1);
                summary.put("latestScore", latestScan.getRiskScore());
                summary.put("riskLevel", latestScan.getRiskLevel());
                summary.put("scanDate", latestScan.getScanDate());
                summary.put("organization", latestScan.getOrganizationName());
            } else {
                summary.put("latestScore", 0);
                summary.put("riskLevel", "No scans performed");
                summary.put("scanDate", null);
                summary.put("organization", user.getOrganization());
            }
            
            summary.put("totalScans", scanResults.size());
            summary.put("userId", user.getId());
            
            return ResponseEntity.ok(summary);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to get score summary: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
