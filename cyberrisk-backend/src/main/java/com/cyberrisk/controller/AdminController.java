package com.cyberrisk.controller;

import com.cyberrisk.model.Role;
import com.cyberrisk.model.User;
import com.cyberrisk.repository.ScanResultRepository;
import com.cyberrisk.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Admin Controller
 * 
 * Handles administrative endpoints and analytics.
 */
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private ScanResultRepository scanResultRepository;
    
    /**
     * Get system statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<?> getSystemStats(Authentication authentication) {
        try {
            User admin = (User) authentication.getPrincipal();
            
            Map<String, Object> stats = new HashMap<>();
            
            // User statistics
            long totalUsers = userService.getTotalUserCount();
            long adminUsers = userService.countUsersByRole(Role.ADMIN);
            long regularUsers = userService.countUsersByRole(Role.USER);
            
            stats.put("totalUsers", totalUsers);
            stats.put("adminUsers", adminUsers);
            stats.put("regularUsers", regularUsers);
            
            // Scan statistics
            long totalScans = scanResultRepository.count();
            long criticalScans = scanResultRepository.countByRiskLevel(com.cyberrisk.model.RiskLevel.CRITICAL);
            long highRiskScans = scanResultRepository.countByRiskLevel(com.cyberrisk.model.RiskLevel.HIGH);
            long mediumRiskScans = scanResultRepository.countByRiskLevel(com.cyberrisk.model.RiskLevel.MEDIUM);
            long lowRiskScans = scanResultRepository.countByRiskLevel(com.cyberrisk.model.RiskLevel.LOW);
            
            stats.put("totalScans", totalScans);
            stats.put("criticalRiskScans", criticalScans);
            stats.put("highRiskScans", highRiskScans);
            stats.put("mediumRiskScans", mediumRiskScans);
            stats.put("lowRiskScans", lowRiskScans);
            
            // Calculate average risk score
            Double averageRiskScore = scanResultRepository.getAverageRiskScore();
            stats.put("averageRiskScore", averageRiskScore != null ? Math.round(averageRiskScore) : 0);
            
            // Recent activity
            stats.put("lastUpdated", java.time.LocalDateTime.now());
            stats.put("adminUser", admin.getUsername());
            
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to retrieve system statistics: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get all users (admin only)
     */
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(Authentication authentication) {
        try {
            List<User> users = userService.getAllUsers();
            
            // Remove sensitive information
            List<Map<String, Object>> userList = users.stream()
                .map(user -> {
                    Map<String, Object> userInfo = new HashMap<>();
                    userInfo.put("id", user.getId());
                    userInfo.put("username", user.getUsername());
                    userInfo.put("email", user.getEmail());
                    userInfo.put("firstName", user.getFirstName());
                    userInfo.put("lastName", user.getLastName());
                    userInfo.put("organization", user.getOrganization());
                    userInfo.put("role", user.getRole());
                    userInfo.put("enabled", user.isEnabled());
                    userInfo.put("createdAt", user.getCreatedAt());
                    userInfo.put("lastLogin", user.getLastLogin());
                    return userInfo;
                })
                .toList();
            
            Map<String, Object> response = new HashMap<>();
            response.put("users", userList);
            response.put("totalUsers", userList.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to retrieve users: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get users by role
     */
    @GetMapping("/users/role/{role}")
    public ResponseEntity<?> getUsersByRole(@PathVariable String role, Authentication authentication) {
        try {
            Role userRole = Role.valueOf(role.toUpperCase());
            List<User> users = userService.getUsersByRole(userRole);
            
            List<Map<String, Object>> userList = users.stream()
                .map(user -> {
                    Map<String, Object> userInfo = new HashMap<>();
                    userInfo.put("id", user.getId());
                    userInfo.put("username", user.getUsername());
                    userInfo.put("email", user.getEmail());
                    userInfo.put("firstName", user.getFirstName());
                    userInfo.put("lastName", user.getLastName());
                    userInfo.put("organization", user.getOrganization());
                    userInfo.put("role", user.getRole());
                    userInfo.put("enabled", user.isEnabled());
                    userInfo.put("createdAt", user.getCreatedAt());
                    userInfo.put("lastLogin", user.getLastLogin());
                    return userInfo;
                })
                .toList();
            
            Map<String, Object> response = new HashMap<>();
            response.put("users", userList);
            response.put("role", userRole);
            response.put("totalUsers", userList.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to retrieve users by role: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get system health
     */
    @GetMapping("/health")
    public ResponseEntity<?> getSystemHealth(Authentication authentication) {
        try {
            Map<String, Object> health = new HashMap<>();
            
            // Database connectivity
            long userCount = userService.getTotalUserCount();
            long scanCount = scanResultRepository.count();
            
            health.put("status", "UP");
            health.put("database", "Connected");
            health.put("totalUsers", userCount);
            health.put("totalScans", scanCount);
            health.put("timestamp", java.time.LocalDateTime.now());
            health.put("version", "1.0.0");
            health.put("service", "CyberRisk Backend");
            
            return ResponseEntity.ok(health);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("status", "DOWN");
            error.put("error", "System health check failed: " + e.getMessage());
            return ResponseEntity.status(503).body(error);
        }
    }
}
