# JobPortal Frontend

A React + Tailwind frontend for your Spring Boot JobPortal API. Supports both
roles — recruiters post and manage jobs, job seekers browse and apply.

## 1. Fix CORS on the backend first

See `BACKEND_CORS_FIX.md` in this folder. Without this change, every request
from this app will fail in the browser with a CORS error. This is the one
change you need to make to your Spring Boot project.

## 2. Run the backend

Start your Spring Boot app as usual. It should be running on
`http://localhost:8080`. Make sure MySQL is running on port 3307 as configured
in your `application.properties`.

## 3. Run this frontend

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Register an account (pick Recruiter or Job
seeker), then sign in.

## What's wired up

- **Auth** — register, login, JWT stored in localStorage, attached to every
  request automatically.
- **Job seeker** — browse jobs with search, view job detail, apply with a
  resume (PDF) upload and optional cover letter, track application status,
  withdraw a pending application.
- **Recruiter** — dashboard with metrics, post a job, view/manage my postings,
  close a posting, review applicants per job, accept/reject.
- **Shared** — notifications, profile editing.

## Project structure

```
src/
  api/         axios calls, one file per backend controller
  components/  shared UI (Shell, Form inputs, StatusBadge, etc.)
  context/     AuthContext - holds the logged-in user and JWT
  pages/       one file per route/screen
```

## Notes on the backend mapping

- Login returns a raw JWT string (not JSON) — the frontend handles this directly.
- applyToJob sends multipart/form-data with fields resume (file) and
  coverLetter (text) — matches your @RequestParam signature.
- updateApplicationStatus sends status as a query parameter, not a JSON
  body — matches your controller exactly.
- The notification "read" field is sent by Jackson as read, not isRead,
  because of how Lombok names the getter for a boolean field already starting
  with "is". The frontend accounts for this.
