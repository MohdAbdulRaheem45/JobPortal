package com.example.JobPortal.job.dtos;


import com.example.JobPortal.job.entity.JobType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


import java.time.LocalDateTime;

@Data
public class JobRequest {
    @NotNull
    private String title;
    @NotNull
    private String description;
    @NotNull
    private String company;
    @NotNull
    private String location;
    @NotNull
    private String salaryRange;
    @NotNull
    private JobType jobType;
    @NotNull
    private LocalDateTime deadline;

}
