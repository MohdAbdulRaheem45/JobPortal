# Full Stack Job Portal

HireWave is a full-stack Job Portal application built using **Java Spring Boot**, **React**, and **MySQL**. The platform allows Job Seekers to search and apply for jobs while Recruiters can post jobs, manage applications, and update candidate statuses.

## 📌 Features

### Authentication & Authorization

* User Registration and Login
* JWT-Based Authentication
* Spring Security Integration
* Role-Based Access Control

  * Recruiter
  * Job Seeker

### Job Management

* Create Job Posting
* View All Jobs
* Search Jobs
* Close Job Posting
* Pagination Support

### Application Management

* Apply to Jobs
* Upload Resume (PDF)
* Cover Letter Submission
* View Applied Jobs
* Withdraw Application

### Recruiter Features

* View Applicants for Posted Jobs
* Accept Applications
* Reject Applications
* Restrict Access to Own Job Applications

### Notification System

* In-App Notifications
* Mark Notifications as Read
* Real-Time Status Updates

### Email Service

* Application Submitted Email
* Application Accepted Email
* Application Rejected Email
* SMTP Integration using Gmail

### File Upload System

* Resume Upload using MultipartFile
* Unique File Names using UUID
* Local File Storage
* Resume Download/View Support

### Exception Handling

* Global Exception Handler
* Custom Exceptions
* Proper API Error Responses

---

## 🛠 Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* MySQL
* Java Mail Sender
* Maven

### Frontend

* React
* React Router
* Axios
* Modern Responsive UI

### Tools

* IntelliJ IDEA
* VS Code
* Postman
* Git
* GitHub

---

## 🔐 Security Features

* JWT Authentication
* Password Encryption using BCrypt
* Stateless Authentication
* Role-Based Authorization
* Protected APIs
* Secure Resume Access

---

## 📂 Project Structure

```text
JobPortal
│
├── backend
│   ├── auth
│   ├── user
│   ├── job
│   ├── application
│   ├── notification
│   ├── config
│   ├── exception
│   └── util
│
└── frontend
    ├── pages
    ├── components
    ├── services
    └── routes
```

## ⚙️ Backend Workflow

1. User Registers
2. User Logs In
3. JWT Token Generated
4. Token Sent in Authorization Header
5. JWT Filter Validates Request
6. Security Context Stores Authentication
7. Authorized APIs Become Accessible
8. Data Stored/Retrieved from MySQL

---

## 📧 Email Workflow

1. User Applies for Job
2. Application Stored in Database
3. Email Service Triggered
4. Gmail SMTP Server Authenticates Request
5. Email Delivered to Candidate

---

## 📄 Resume Upload Workflow

1. Candidate Uploads Resume
2. MultipartFile Receives File
3. UUID Generates Unique Filename
4. File Saved in uploads Folder
5. File Path Stored in Database
6. Recruiter Can View Resume

---

## 🌐 Frontend & Backend Communication

React Frontend communicates with Spring Boot Backend using REST APIs.

```text
React UI
   ↓
Axios Request
   ↓
Spring Boot API
   ↓
MySQL Database
   ↓
Response Returned
   ↓
React UI Updated
```

---

## 🚀 Future Enhancements

* AI Resume Analysis
* AI Job Matching
* AI Cover Letter Generator
* Interview Scheduling
* Recruiter Dashboard Analytics
* Cloud Storage Integration (AWS S3)

---

## 📚 Concepts Implemented

* OOP
* Collections
* Exception Handling
* REST APIs
* MVC Architecture
* DTO Pattern
* Repository Pattern
* Dependency Injection
* JWT Authentication
* Spring Security
* Pagination
* File Upload
* Email Integration
* CORS Configuration

---

## 👨‍💻 Author

Developed as a Full Stack Java Spring Boot + React Project for learning enterprise application development, authentication, security, and real-world software architecture.
