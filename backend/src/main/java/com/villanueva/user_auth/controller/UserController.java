package com.villanueva.user_auth.controller;

import com.villanueva.user_auth.model.User;
import com.villanueva.user_auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        // Since we are using Basic Auth for this lab, we can get the username/email directly
        // Note: If 'authentication' is null, it means they aren't logged in.

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Not Authenticated");
        }

        String email = authentication.getName(); // Spring Security stores the identifier here
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}