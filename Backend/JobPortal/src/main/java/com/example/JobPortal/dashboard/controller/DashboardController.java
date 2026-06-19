package com.example.JobPortal.dashboard.controller;

import com.example.JobPortal.dashboard.dto.DashboardResponse;
import com.example.JobPortal.dashboard.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardResponse>
    getDashboard() {

        return ResponseEntity.ok(
                dashboardService.getDashboard()
        );
    }
}