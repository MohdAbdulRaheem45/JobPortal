package com.example.JobPortal.application.repository;

import com.example.JobPortal.application.entity.Application;
import com.example.JobPortal.application.entity.ApplicationStatus;
import com.example.JobPortal.job.entity.Job;
import com.example.JobPortal.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application,Long> {
    List<Application> findByApplicant(User applicant);
    List<Application> findByJob(Job job);
    Optional<Application> findByApplicantAndJob(User applicant, Job job);
    long countByStatus(ApplicationStatus status);
}
