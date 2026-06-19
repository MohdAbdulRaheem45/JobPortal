package com.example.JobPortal.dashboard.service;

import com.example.JobPortal.application.entity.ApplicationStatus;
import com.example.JobPortal.application.repository.ApplicationRepository;
import com.example.JobPortal.dashboard.dto.DashboardResponse;
import com.example.JobPortal.job.entity.JobStatus;
import com.example.JobPortal.job.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    public DashboardResponse getDashboard() {

        DashboardResponse response =
                new DashboardResponse();

        response.setTotalJobs(
                jobRepository.count()
        );

        response.setOpenJobs(
                jobRepository.countByStatus(JobStatus.OPEN)
        );

        response.setClosedJobs(
                jobRepository.countByStatus(JobStatus.CLOSED)
        );

        response.setTotalApplications(
                applicationRepository.count()
        );

        response.setPendingApplications(
                applicationRepository.countByStatus(
                        ApplicationStatus.PENDING
                )
        );

        response.setAcceptedApplications(
                applicationRepository.countByStatus(
                        ApplicationStatus.ACCEPTED
                )
        );

        response.setRejectedApplications(
                applicationRepository.countByStatus(
                        ApplicationStatus.REJECTED
                )
        );

        return response;
    }
}