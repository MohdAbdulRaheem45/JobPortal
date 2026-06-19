package com.example.JobPortal.application.service;

import com.example.JobPortal.application.dto.ApplicationResponse;
import com.example.JobPortal.application.entity.Application;
import com.example.JobPortal.application.entity.ApplicationStatus;
import com.example.JobPortal.application.repository.ApplicationRepository;
import com.example.JobPortal.exception.DuplicateApplicationException;
import com.example.JobPortal.exception.ResourceNotFoundException;
import com.example.JobPortal.exception.UnauthorizedException;
import com.example.JobPortal.job.entity.Job;
import com.example.JobPortal.job.entity.JobStatus;
import com.example.JobPortal.job.repository.JobRepository;
import com.example.JobPortal.notification.service.NotificationService;
import com.example.JobPortal.user.entity.User;
import com.example.JobPortal.user.repository.UserRepository;
import com.example.JobPortal.util.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.JobPortal.email.EmailService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private FileUploadUtil fileUploadUtil;
    @Autowired
    private EmailService emailService;

    public String applyToJob(Long jobId,
                             MultipartFile resume,
                             String coverLetter) throws IOException {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User applicant = userRepository.findByEmail(email);

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (job.getStatus() == JobStatus.CLOSED) {
            throw new RuntimeException("Job is closed");
        }

        if (applicationRepository
                .findByApplicantAndJob(applicant, job)
                .isPresent()) {

            throw new DuplicateApplicationException("Already applied");
        }

        String resumePath = fileUploadUtil.saveFile(resume);

        Application application = new Application();

        application.setApplicant(applicant);
        application.setJob(job);
        application.setResumePath(resumePath);
        application.setCoverLetter(coverLetter);
        application.setAppliedAt(LocalDateTime.now());
        application.setStatus(ApplicationStatus.PENDING);

        applicationRepository.save(application);

        emailService.sendApplicationSubmittedEmail(
                applicant.getEmail(),
                applicant.getUsername(),
                job.getTitle()
        );
        notificationService.createNotification(
                applicant,
                "Application submitted for "
                        + job.getTitle()
        );
        return "Application submitted successfully";
    }

    public List<ApplicationResponse> getMyApplications() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User applicant = userRepository.findByEmail(email);

        return applicationRepository.findByApplicant(applicant)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ApplicationResponse> getApplicationsByJob(Long jobId) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User recruiter = userRepository.findByEmail(email);

        if (!job.getPostedBy()
                .getId()
                .equals(recruiter.getId())) {

            throw new UnauthorizedException(
                    "Not your job posting"
            );
        }
        return applicationRepository.findByJob(job)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public String withdrawApplication(Long applicationId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User applicant = userRepository.findByEmail(email);

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        if (!application.getApplicant().getId().equals(applicant.getId())) {
            throw new UnauthorizedException("Unauthorized");
        }

        applicationRepository.delete(application);

        return "Application withdrawn successfully";
    }

    public String updateStatus(Long applicationId,
                               ApplicationStatus status) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User recruiter = userRepository.findByEmail(email);
        if (!application.getJob()
                .getPostedBy()
                .getId()
                .equals(recruiter.getId())) {

            throw new UnauthorizedException(
                    "Not your job posting"
            );
        }
        application.setStatus(status);

        applicationRepository.save(application);

        if (status == ApplicationStatus.ACCEPTED) {

            emailService.sendApplicationAcceptedEmail(
                    application.getApplicant().getEmail(),
                    application.getApplicant().getUsername(),
                    application.getJob().getTitle()
            );
            notificationService.createNotification(
                    application.getApplicant(),
                    "Your application for "
                            + application.getJob().getTitle()
                            + " was accepted"
            );

        } else if (status == ApplicationStatus.REJECTED) {

            emailService.sendApplicationRejectedEmail(
                    application.getApplicant().getEmail(),
                    application.getApplicant().getUsername(),
                    application.getJob().getTitle()
            );
            notificationService.createNotification(
                    application.getApplicant(),
                    "Your application for "
                            + application.getJob().getTitle()
                            + " was rejected"
            );
        }

        return "Status updated successfully";
    }

    private ApplicationResponse mapToResponse(Application app) {

        ApplicationResponse response = new ApplicationResponse();

        response.setId(app.getId());
        response.setApplicantName(app.getApplicant().getUsername());
        response.setApplicantEmail(app.getApplicant().getEmail());

        response.setJobId(app.getJob().getId());
        response.setJobTitle(app.getJob().getTitle());

        response.setResumePath(app.getResumePath());
        response.setCoverLetter(app.getCoverLetter());

        response.setStatus(app.getStatus());
        response.setAppliedAt(app.getAppliedAt());

        return response;
    }
}