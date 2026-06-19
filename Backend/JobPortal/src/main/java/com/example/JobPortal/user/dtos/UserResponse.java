package com.example.JobPortal.user.dtos;

import com.example.JobPortal.user.entity.Role;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponse {

    private Long id;
    private String username;
    private String email;
    private String phone;
    private Role role;
    private LocalDateTime createdAt;
}