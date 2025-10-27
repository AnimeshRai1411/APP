package com.cyberrisk.controller;

import com.cyberrisk.model.User;
import com.cyberrisk.service.ScanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;

/**
 * Report Controller
 * 
 * Handles report generation and history endpoints.
 */
@RestController
@RequestMapping("/report")
@CrossOrigin(origins = "*")
public class ReportController {
    
    @Autowired
    private ScanService scanService;
    
    /**
     * Get user's scan report history
     */
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserReports(@PathVariable String userId, Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            
            // Check if user is requesting their own reports or is admin
            if (!currentUser.getId().equals(Long.parseLong(userId)) && !currentUser.isAdmin()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Access denied: You can only view your own reports");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }
            
            // Get user's scan history
            List<com.cyberrisk.dto.ScanResponse> reports = scanService.getScanResultsByUser(currentUser);
            
            Map<String, Object> response = new HashMap<>();
            response.put("userId", userId);
            response.put("reports", reports);
            response.put("totalReports", reports.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to retrieve reports: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get current user's reports
     */
    @GetMapping("/my-reports")
    public ResponseEntity<?> getMyReports(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            List<com.cyberrisk.dto.ScanResponse> reports = scanService.getScanResultsByUser(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("userId", user.getId());
            response.put("username", user.getUsername());
            response.put("organization", user.getOrganization());
            response.put("reports", reports);
            response.put("totalReports", reports.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to retrieve your reports: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Generate comprehensive report
     */
    @GetMapping("/comprehensive")
    public ResponseEntity<?> generateComprehensiveReport(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            List<com.cyberrisk.dto.ScanResponse> reports = scanService.getScanResultsByUser(user);
            
            Map<String, Object> comprehensiveReport = new HashMap<>();
            comprehensiveReport.put("userId", user.getId());
            comprehensiveReport.put("username", user.getUsername());
            comprehensiveReport.put("organization", user.getOrganization());
            comprehensiveReport.put("generatedAt", java.time.LocalDateTime.now());
            
            if (!reports.isEmpty()) {
                // Calculate statistics
                double averageScore = reports.stream()
                    .mapToInt(com.cyberrisk.dto.ScanResponse::getRiskScore)
                    .average()
                    .orElse(0);
                
                int highestScore = reports.stream()
                    .mapToInt(com.cyberrisk.dto.ScanResponse::getRiskScore)
                    .max()
                    .orElse(0);
                
                int lowestScore = reports.stream()
                    .mapToInt(com.cyberrisk.dto.ScanResponse::getRiskScore)
                    .min()
                    .orElse(0);
                
                comprehensiveReport.put("averageScore", Math.round(averageScore));
                comprehensiveReport.put("highestScore", highestScore);
                comprehensiveReport.put("lowestScore", lowestScore);
                comprehensiveReport.put("totalScans", reports.size());
                
                // Get latest scan details
                var latestScan = reports.get(reports.size() - 1);
                comprehensiveReport.put("latestScan", latestScan);
                
                // Risk level distribution
                Map<String, Long> riskLevelDistribution = reports.stream()
                    .collect(java.util.stream.Collectors.groupingBy(
                        report -> report.getRiskLevel().getDisplayName(),
                        java.util.stream.Collectors.counting()
                    ));
                comprehensiveReport.put("riskLevelDistribution", riskLevelDistribution);
                
            } else {
                comprehensiveReport.put("message", "No scan reports available");
                comprehensiveReport.put("averageScore", 0);
                comprehensiveReport.put("totalScans", 0);
            }
            
            return ResponseEntity.ok(comprehensiveReport);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to generate comprehensive report: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
