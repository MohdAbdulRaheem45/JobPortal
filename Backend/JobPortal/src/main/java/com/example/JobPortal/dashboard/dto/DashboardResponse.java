package com.example.JobPortal.dashboard.dto;

import lombok.Data;

@Data
public class DashboardResponse {

    private Long totalJobs;

    private Long openJobs;

    private Long closedJobs;

    private Long totalApplications;

    private Long pendingApplications;

    private Long acceptedApplications;

    private Long rejectedApplications;
}