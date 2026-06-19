package com.example.JobPortal.notification.repo;

import com.example.JobPortal.notification.entity.Notification;
import com.example.JobPortal.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    List<Notification> findByUserOrderByCreatedAtDesc(User user);
}