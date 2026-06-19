package com.example.JobPortal.user.service;

import com.example.JobPortal.user.entity.User;
import com.example.JobPortal.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository repo;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User u=repo.findByEmail(email);
        return org.springframework.security.core.userdetails
                .User.builder()
                .username(u.getEmail())
                .password(u.getPassword())
                .roles(String.valueOf(u.getRole()))
                .build();

    }
}
