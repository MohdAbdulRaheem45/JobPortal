package com.example.JobPortal.auth.service;

import com.example.JobPortal.auth.dtos.LoginRequest;
import com.example.JobPortal.auth.dtos.RegisterRequest;
import com.example.JobPortal.config.JwtUtil;
import com.example.JobPortal.exception.DuplicateApplicationException;
import com.example.JobPortal.exception.UnauthorizedException;
import com.example.JobPortal.user.entity.User;
import com.example.JobPortal.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
public class AuthService {
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository repo;



    public String register(RegisterRequest r) {
        if(repo.existsByEmail(r.getEmail())){
            throw new DuplicateApplicationException("Email already exist");
        }
        User u=User.builder()
                .email(r.getEmail())
                .phone(r.getPhone())
                .password(passwordEncoder.encode(r.getPassword()))
                .createdAt(LocalDateTime.now())
                .role(r.getRole())
                .username(r.getUsername())
                .build();
        repo.save(u);
        return "Successfully Registered";
    }
    public String login(LoginRequest l) {
        User u=repo.findByEmail(l.getEmail());
        if(!passwordEncoder.matches(l.getPassword(),u.getPassword())){
            throw new UnauthorizedException(
                    "Invalid email or password"
            );
        }
        return JwtUtil.generateToken(l.getEmail());
    }
}
