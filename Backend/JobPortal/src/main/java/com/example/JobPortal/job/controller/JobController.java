package com.example.JobPortal.job.controller;

import com.example.JobPortal.job.dtos.JobRequest;
import com.example.JobPortal.job.dtos.JobResponse;
import com.example.JobPortal.job.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;


    //  CREATE JOB
    @PostMapping
    public ResponseEntity<JobResponse> createJob(@Valid @RequestBody JobRequest request) {
        return new ResponseEntity<>(jobService.createJob(request), HttpStatus.CREATED);
    }

    //  PAGINATION
    @GetMapping
    public ResponseEntity<List<JobResponse>> getAllJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return new ResponseEntity<>(jobService.getAllJobs(page, size), HttpStatus.OK);
    }

    //  SEARCH + PAGINATION
    @GetMapping("/search")
    public ResponseEntity<List<JobResponse>> searchJobs(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String location,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return new ResponseEntity<>(
                jobService.searchJobs(q, location, page, size),
                HttpStatus.OK
        );
    }

    // 🔹 GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {
        return new ResponseEntity<>(jobService.getJobById(id), HttpStatus.OK);
    }

    //  MY JOBS (RECRUITER)
    @GetMapping("/my")
    public ResponseEntity<List<JobResponse>> getMyJobs() {
        return new ResponseEntity<>(jobService.getMyJobs(), HttpStatus.OK);
    }

    // CLOSE JOB
    @PutMapping("/{id}/close")
    public ResponseEntity<String> closeJob(@PathVariable Long id) {
        return new ResponseEntity<>(jobService.closeJob(id), HttpStatus.OK);
    }
}