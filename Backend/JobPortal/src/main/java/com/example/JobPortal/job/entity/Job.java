package com.example.JobPortal.job.entity;

import com.example.JobPortal.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String company;
    @Column(nullable = false)
    private String location;
    @Column(nullable = false)
    private String salaryRange;
    @Enumerated(EnumType.STRING)
    private JobType jobType;
    @Enumerated(EnumType.STRING)
    private  JobStatus status;
    @Column(nullable = false)
    private LocalDateTime postedAt;
    @Column(nullable = false)
    private LocalDateTime deadline;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User postedBy;

}
