package com.example.JobPortal.user.service2;

import com.example.JobPortal.user.dtos.UpdateUserRequest;
import com.example.JobPortal.user.dtos.UserResponse;
import com.example.JobPortal.user.entity.User;
import com.example.JobPortal.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponse getMyProfile() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email);

        return mapToResponse(user);
    }

    public UserResponse updateProfile(UpdateUserRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email);

        user.setUsername(request.getUsername());
        user.setPhone(request.getPhone());

        userRepository.save(user);

        return mapToResponse(user);
    }

    private UserResponse mapToResponse(User user) {

        UserResponse response = new UserResponse();

        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setRole(user.getRole());
        response.setCreatedAt(user.getCreatedAt());

        return response;
    }
}