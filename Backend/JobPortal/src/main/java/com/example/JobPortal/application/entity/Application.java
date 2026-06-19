package com.example.JobPortal.application.entity;

import com.example.JobPortal.job.entity.Job;
import com.example.JobPortal.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User applicant;
    @ManyToOne
    private Job job;
    private String resumePath;
    private String coverLetter;
    private LocalDateTime appliedAt;
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;
}
