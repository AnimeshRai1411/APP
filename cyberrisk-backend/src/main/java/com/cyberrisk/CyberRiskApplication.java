package com.cyberrisk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Spring Boot Application Class
 * 
 * CyberRisk - The Credit Score for Cybersecurity
 * 
 * This application provides a comprehensive cybersecurity assessment platform
 * that generates risk scores for organizations similar to credit scores.
 * 
 * Features:
 * - User authentication and authorization
 * - Vulnerability scanning simulation
 * - Risk analysis and scoring
 * - Report generation and history
 * - Admin dashboard with analytics
 * 
 * @author CyberRisk Team
 * @version 1.0.0
 */
@SpringBootApplication
public class CyberRiskApplication {

    public static void main(String[] args) {
        SpringApplication.run(CyberRiskApplication.class, args);
        System.out.println("\n" +
            "╔══════════════════════════════════════════════════════════════╗\n" +
            "║                    🛡️  CyberRisk Backend  🛡️                    ║\n" +
            "║                                                              ║\n" +
            "║  The Credit Score for Cybersecurity                          ║\n" +
            "║                                                              ║\n" +
            "║  🚀 Server running on: http://localhost:8080/api             ║\n" +
            "║  📊 H2 Database: http://localhost:8080/api/h2-console        ║\n" +
            "║  🔐 Admin credentials: admin / admin123                      ║\n" +
            "║                                                              ║\n" +
            "║  Ready to assess cybersecurity risks! 🎯                     ║\n" +
            "╚══════════════════════════════════════════════════════════════╝\n");
    }
}
