package com.example.JobPortal.job.service;

import com.example.JobPortal.exception.ResourceNotFoundException;
import com.example.JobPortal.exception.UnauthorizedException;
import com.example.JobPortal.job.dtos.JobRequest;
import com.example.JobPortal.job.dtos.JobResponse;
import com.example.JobPortal.job.entity.Job;
import com.example.JobPortal.job.entity.JobStatus;
import com.example.JobPortal.job.repository.JobRepository;
import com.example.JobPortal.user.entity.User;
import com.example.JobPortal.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class JobService {
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private UserRepository userRepository;
    public JobResponse createJob(JobRequest request){
        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userRepository.findByEmail(email);
        Job j=Job.builder()
                .salaryRange(request.getSalaryRange())
                .company(request.getCompany())
                .deadline(request.getDeadline())
                .postedAt(LocalDateTime.now())
                .title(request.getTitle())
                .jobType(request.getJobType())
                .status(JobStatus.OPEN)
                .location(request.getLocation())
                .description(request.getDescription())
                .postedBy(user)
                .build();
        Job savedJob=jobRepository.save(j);
        return maptoResponse(savedJob);
    }
    public List<JobResponse> getAllJobs(int page,int size){
        Pageable pageable= PageRequest.of(page,size);
        Page<Job> JobsPage= jobRepository.findByStatus(JobStatus.OPEN,pageable);
        return JobsPage.getContent()
                .stream()
                .map(this::maptoResponse)
                .collect(Collectors.toList());
    }
    public JobResponse getJobById(Long id){
        Job j= jobRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Job Not Found"));
    return maptoResponse(j);
    }
    public List<JobResponse> searchJobs(String q,String location,int page,int size){
        if(q==null) q="";
        if(location==null) location="";
        Pageable pageable=PageRequest.of(page,size);
        Page<Job> JobsPage=jobRepository.findByTitleContainingIgnoreCaseAndLocationContainingIgnoreCaseAndStatus(q,location,JobStatus.OPEN,pageable);
        return  JobsPage.getContent()
                .stream()
                .map(this::maptoResponse)
                .collect(Collectors.toList());
    }
    public String closeJob(Long id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job Not Found"));

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email);

        if (!job.getPostedBy().getId().equals( user.getId())) {
            throw new UnauthorizedException(
                    "Unauthorized"
            );
        }

        job.setStatus(JobStatus.CLOSED);
        jobRepository.save(job);

        return "Job closed successfully";
    }
    public List<JobResponse> getMyJobs() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email);


        return jobRepository.findByPostedBy(user)
                .stream()
                .map(this::maptoResponse)
                .collect(Collectors.toList());
    }

    private  JobResponse maptoResponse(Job job) {
        JobResponse res = new JobResponse();
        res.setId(job.getId());
        res.setTitle(job.getTitle());
        res.setDescription(job.getDescription());
        res.setCompany(job.getCompany());
        res.setLocation(job.getLocation());
        res.setSalaryRange(job.getSalaryRange());
        res.setJobType(job.getJobType());
        res.setStatus(job.getStatus());
        res.setPostedAt(job.getPostedAt());
        res.setDeadline(job.getDeadline());
        res.setPostedByName(job.getPostedBy().getUsername());
        return res;
    }

}
