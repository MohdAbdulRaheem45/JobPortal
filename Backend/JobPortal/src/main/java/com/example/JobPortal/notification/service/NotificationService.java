package com.example.JobPortal.notification.service;

import com.example.JobPortal.exception.ResourceNotFoundException;
import com.example.JobPortal.notification.dto.NotificationResponse;
import com.example.JobPortal.notification.entity.Notification;
import com.example.JobPortal.notification.repo.NotificationRepository;
import com.example.JobPortal.user.entity.User;
import com.example.JobPortal.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    public void createNotification(User user, String message) {

        Notification notification = Notification.builder()
                .message(message)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        notificationRepository.save(notification);
    }

    public List<NotificationResponse> getMyNotifications() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email);

        return notificationRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public String markAsRead(Long id) {

        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Notification not found"));

        notification.setRead(true);

        notificationRepository.save(notification);

        return "Notification marked as read";
    }

    private NotificationResponse mapToResponse(Notification n) {

        NotificationResponse response =
                new NotificationResponse();

        response.setId(n.getId());
        response.setMessage(n.getMessage());
        response.setRead(n.isRead());
        response.setCreatedAt(n.getCreatedAt());

        return response;
    }
}