package com.example.JobPortal.user.dtos;

import lombok.Data;

@Data
public class UpdateUserRequest {

    private String username;
    private String phone;
}