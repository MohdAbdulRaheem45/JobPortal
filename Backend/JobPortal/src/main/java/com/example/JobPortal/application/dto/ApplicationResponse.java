package com.example.JobPortal.application.dto;

import com.example.JobPortal.application.entity.ApplicationStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApplicationResponse {

    private Long id;

    private String applicantName;

    private String applicantEmail;

    private Long jobId;

    private String jobTitle;

    private String resumePath;

    private String coverLetter;

    private ApplicationStatus status;

    private LocalDateTime appliedAt;
}