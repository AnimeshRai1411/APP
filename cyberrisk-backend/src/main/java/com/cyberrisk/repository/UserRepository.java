package com.cyberrisk.repository;

import com.cyberrisk.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * User Repository
 * 
 * Data access layer for User entities.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find user by username
     */
    Optional<User> findByUsername(String username);
    
    /**
     * Find user by email
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Check if username exists
     */
    boolean existsByUsername(String username);
    
    /**
     * Check if email exists
     */
    boolean existsByEmail(String email);
    
    /**
     * Find users by organization
     */
    java.util.List<User> findByOrganization(String organization);
    
    /**
     * Find users by role
     */
    java.util.List<User> findByRole(com.cyberrisk.model.Role role);
    
    /**
     * Count users by role
     */
    long countByRole(com.cyberrisk.model.Role role);
}
