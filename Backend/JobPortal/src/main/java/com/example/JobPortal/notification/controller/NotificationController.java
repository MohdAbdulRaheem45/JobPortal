package com.example.JobPortal.notification.controller;

import com.example.JobPortal.notification.dto.NotificationResponse;
import com.example.JobPortal.notification.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController{
    @Autowired
    private NotificationService notificationService;
    @GetMapping("/my")
    public ResponseEntity<List<NotificationResponse>> getmyNotifications(){
        return ResponseEntity.ok(notificationService.getMyNotifications());
    }
    @PutMapping("/{id}/read")
    public ResponseEntity<String> markAsRead(@PathVariable Long id){
        return ResponseEntity.ok(notificationService.markAsRead(id));
    }
}
