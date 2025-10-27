package com.cyberrisk.repository;

import com.cyberrisk.model.ScanResult;
import com.cyberrisk.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Scan Result Repository
 * 
 * Data access layer for ScanResult entities.
 */
@Repository
public interface ScanResultRepository extends JpaRepository<ScanResult, Long> {
    
    /**
     * Find scan results by user
     */
    List<ScanResult> findByUser(User user);
    
    /**
     * Find scan results by user ID
     */
    List<ScanResult> findByUserId(Long userId);
    
    /**
     * Find scan results by organization name
     */
    List<ScanResult> findByOrganizationName(String organizationName);
    
    /**
     * Find scan results by date range
     */
    List<ScanResult> findByScanDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    /**
     * Find scan results by risk level
     */
    List<ScanResult> findByRiskLevel(com.cyberrisk.model.RiskLevel riskLevel);
    
    /**
     * Find latest scan result for a user
     */
    ScanResult findTopByUserOrderByScanDateDesc(User user);
    
    /**
     * Count scan results by user
     */
    long countByUser(User user);
    
    /**
     * Count scan results by risk level
     */
    long countByRiskLevel(com.cyberrisk.model.RiskLevel riskLevel);
    
    /**
     * Get average risk score
     */
    @Query("SELECT AVG(s.riskScore) FROM ScanResult s")
    Double getAverageRiskScore();
    
    /**
     * Find scan results with risk score above threshold
     */
    List<ScanResult> findByRiskScoreGreaterThan(int threshold);
    
    /**
     * Find scan results with risk score below threshold
     */
    List<ScanResult> findByRiskScoreLessThan(int threshold);
}
