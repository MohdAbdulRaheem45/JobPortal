package com.example.JobPortal.auth.controller;

import com.example.JobPortal.auth.dtos.LoginRequest;
import com.example.JobPortal.auth.dtos.RegisterRequest;
import com.example.JobPortal.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthContoller {
    @Autowired
    private AuthService service;
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest r){
        return new ResponseEntity<>(service.register(r), HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest l){
        return new ResponseEntity<>(service.login(l),HttpStatus.OK);
    }
}
