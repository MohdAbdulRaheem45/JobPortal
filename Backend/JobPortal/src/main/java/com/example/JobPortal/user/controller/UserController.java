package com.example.JobPortal.user.controller;

import com.example.JobPortal.user.dtos.UpdateUserRequest;
import com.example.JobPortal.user.dtos.UserResponse;
import com.example.JobPortal.user.service2.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMyProfile() {

        return ResponseEntity.ok(
                userService.getMyProfile()
        );
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateProfile(
            @RequestBody UpdateUserRequest request
    ) {

        return ResponseEntity.ok(
                userService.updateProfile(request)
        );
    }
}