package com.villanueva.user_auth.controller;

import com.villanueva.user_auth.model.User;
import com.villanueva.user_auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // FRS Requirement: Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already in use!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        // FRS Requirement: Login with Email
        Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());

        if (user.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {
            return ResponseEntity.ok("Login successful!");
        }

        return ResponseEntity.status(401).body("Invalid email or password");
    }
}