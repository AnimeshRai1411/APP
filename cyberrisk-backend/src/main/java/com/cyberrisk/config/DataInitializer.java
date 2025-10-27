package com.cyberrisk.config;

import com.cyberrisk.model.Role;
import com.cyberrisk.model.User;
import com.cyberrisk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * Data Initializer
 * 
 * Initializes the database with default users for demo purposes.
 * 
 * IMPORTANT: Only users created through this initializer or through the registration
 * endpoint can log in. Any other credentials will be rejected by authentication.
 * 
 * Default users:
 * - admin / admin123 (Administrator role)
 * - user / user123 (Regular user role)
 */
@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Check if admin user already exists
        if (!userRepository.existsByUsername("admin")) {
            createAdminUser();
        }
        
        // Check if demo user already exists
        if (!userRepository.existsByUsername("user")) {
            createDemoUser();
        }
        
        System.out.println("✅ Database initialized with default users");
    }
    
    private void createAdminUser() {
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@cyberrisk.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setFirstName("System");
        admin.setLastName("Administrator");
        admin.setOrganization("CyberRisk");
        admin.setRole(Role.ADMIN);
        admin.setEnabled(true);
        admin.setCreatedAt(LocalDateTime.now());
        
        userRepository.save(admin);
        System.out.println("👤 Created admin user: admin / admin123");
    }
    
    private void createDemoUser() {
        User user = new User();
        user.setUsername("user");
        user.setEmail("user@cyberrisk.com");
        user.setPassword(passwordEncoder.encode("user123"));
        user.setFirstName("Demo");
        user.setLastName("User");
        user.setOrganization("Demo Company");
        user.setRole(Role.USER);
        user.setEnabled(true);
        user.setCreatedAt(LocalDateTime.now());
        
        userRepository.save(user);
        System.out.println("👤 Created demo user: user / user123");
    }
}
