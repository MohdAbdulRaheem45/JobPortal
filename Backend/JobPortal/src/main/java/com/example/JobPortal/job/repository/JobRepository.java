package com.example.JobPortal.job.repository;

import com.example.JobPortal.job.entity.Job;
import com.example.JobPortal.job.entity.JobStatus;
import com.example.JobPortal.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job,Long> {
    Page<Job> findByStatus(JobStatus status, Pageable pageable);
    List<Job> findByPostedBy(User user);
    Page<Job> findByTitleContainingIgnoreCaseAndLocationContainingIgnoreCaseAndStatus(
            String title,
            String location,
            JobStatus status,
            Pageable pageable
    );
    long countByStatus(JobStatus status);
}