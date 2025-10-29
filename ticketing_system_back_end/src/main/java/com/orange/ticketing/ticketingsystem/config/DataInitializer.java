package com.orange.ticketing.ticketingsystem.config;

import com.orange.ticketing.ticketingsystem.entity.Role;
import com.orange.ticketing.ticketingsystem.entity.User;
import com.orange.ticketing.ticketingsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Create default admin user if not exists
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@ticketing.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFirstName("System");
            admin.setLastName("Administrator");
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
            System.out.println("Default admin user created: admin/admin123");
        }
        
        // Create default support agent if not exists
        if (!userRepository.existsByUsername("support")) {
            User support = new User();
            support.setUsername("support");
            support.setEmail("support@ticketing.com");
            support.setPassword(passwordEncoder.encode("support123"));
            support.setFirstName("Support");
            support.setLastName("Agent");
            support.setRole(Role.SUPPORT_AGENT);
            userRepository.save(support);
            System.out.println("Default support user created: support/support123");
        }
        
        // Create default regular user if not exists
        if (!userRepository.existsByUsername("user")) {
            User user = new User();
            user.setUsername("user");
            user.setEmail("user@ticketing.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setFirstName("Regular");
            user.setLastName("User");
            user.setRole(Role.USER);
            userRepository.save(user);
            System.out.println("Default regular user created: user/user123");
        }
    }
}