package com.cyberrisk.controller;

import com.cyberrisk.dto.ScanRequest;
import com.cyberrisk.dto.ScanResponse;
import com.cyberrisk.model.User;
import com.cyberrisk.service.ScanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Scan Controller
 * 
 * Handles vulnerability scanning endpoints.
 */
@RestController
@RequestMapping("/scan")
@CrossOrigin(origins = "*")
public class ScanController {
    
    @Autowired
    private ScanService scanService;
    
    /**
     * Perform vulnerability scan
     */
    @PostMapping("/perform")
    public ResponseEntity<?> performScan(@Valid @RequestBody ScanRequest scanRequest, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            ScanResponse response = scanService.performScan(scanRequest, user);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Scan failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get scan result by ID
     */
    @GetMapping("/{scanId}")
    public ResponseEntity<?> getScanResult(@PathVariable String scanId, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            ScanResponse response = scanService.getScanResult(scanId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to retrieve scan result: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get all scan results for current user
     */
    @GetMapping("/history")
    public ResponseEntity<?> getScanHistory(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            List<ScanResponse> responses = scanService.getScanResultsByUser(user);
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to retrieve scan history: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
