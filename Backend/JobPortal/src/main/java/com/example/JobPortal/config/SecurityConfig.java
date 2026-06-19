package com.example.JobPortal.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {
    @Autowired
    private JwtFilter jwtFilter;
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity h){
        return h
                .cors(cors -> {})
                .csrf(c->c.disable())
                .sessionManagement(se->se.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/uploads/**").permitAll()
                        .requestMatchers("/api/auth/**", "/api/applications/test-email").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/jobs").hasRole("RECRUITER")
                        .requestMatchers(HttpMethod.PUT, "/api/jobs/**").hasRole("RECRUITER")
                        .requestMatchers(HttpMethod.GET, "/api/applications/job/**").hasRole("RECRUITER")
                        .requestMatchers(HttpMethod.POST, "/api/applications/**").hasRole("JOB_SEEKER")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}
