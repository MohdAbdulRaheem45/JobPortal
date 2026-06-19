package com.example.JobPortal.job.dtos;

import com.example.JobPortal.job.entity.JobStatus;
import com.example.JobPortal.job.entity.JobType;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class JobResponse {
        private Long id;
        private String title;
        private String description;
        private String company;
        private String location;
        private String salaryRange;
        private JobType jobType;
        private LocalDateTime deadline;
        private LocalDateTime postedAt;
        private JobStatus status;
        private String postedByName;
}
