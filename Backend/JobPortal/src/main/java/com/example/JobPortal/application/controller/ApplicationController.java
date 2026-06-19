package com.example.JobPortal.application.controller;

import com.example.JobPortal.application.service.ApplicationService;
import com.example.JobPortal.email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.JobPortal.application.dto.ApplicationResponse;
import com.example.JobPortal.application.entity.ApplicationStatus;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    @Autowired
    private EmailService emailService;
    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/{jobId}")
    public ResponseEntity<String> applyToJob(
            @PathVariable Long jobId,
            @RequestParam("resume") MultipartFile resume,
            @RequestParam(required = false) String coverLetter
    ) throws IOException {

        return new ResponseEntity<>(
                applicationService.applyToJob(
                        jobId,
                        resume,
                        coverLetter
                ),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/my")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications() {

        return ResponseEntity.ok(
                applicationService.getMyApplications()
        );
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsByJob(
            @PathVariable Long jobId
    ) {

        return ResponseEntity.ok(
                applicationService.getApplicationsByJob(jobId)
        );
    }

    @DeleteMapping("/{applicationId}")
    public ResponseEntity<String> withdrawApplication(
            @PathVariable Long applicationId
    ) {

        return ResponseEntity.ok(
                applicationService.withdrawApplication(applicationId)
        );
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<String> updateStatus(
            @PathVariable Long applicationId,
            @RequestParam ApplicationStatus status
    ) {

        return ResponseEntity.ok(
                applicationService.updateStatus(
                        applicationId,
                        status
                )
        );
    }
}
