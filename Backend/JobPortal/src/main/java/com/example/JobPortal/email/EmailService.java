package com.example.JobPortal.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendApplicationSubmittedEmail(
            String toEmail,
            String applicantName,
            String jobTitle
    ) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("Application Submitted");

        message.setText(
                "Hello " + applicantName + ",\n\n" +
                        "Your application for the position of " +
                        jobTitle +
                        " has been submitted successfully.\n\n" +
                        "Thank you for using Job Portal."
        );

        mailSender.send(message);
    }

    public void sendApplicationAcceptedEmail(
            String toEmail,
            String applicantName,
            String jobTitle
    ) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("Application Accepted");

        message.setText(
                "Congratulations " + applicantName + "!\n\n" +
                        "Your application for " +
                        jobTitle +
                        " has been ACCEPTED."
        );

        mailSender.send(message);
    }

    public void sendApplicationRejectedEmail(
            String toEmail,
            String applicantName,
            String jobTitle
    ) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("Application Update");

        message.setText(
                "Hello " + applicantName + ",\n\n" +
                        "We appreciate your interest in " +
                        jobTitle +
                        ". Unfortunately your application was not selected."
        );

        mailSender.send(message);
    }
}