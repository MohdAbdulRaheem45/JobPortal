import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import HomeRedirect from './components/HomeRedirect'

import Login from './pages/Login'
import Register from './pages/Register'
import BrowseJobs from './pages/BrowseJobs'
import JobDetail from './pages/JobDetail'
import MyApplications from './pages/MyApplications'
import PostJob from './pages/PostJob'
import MyJobs from './pages/MyJobs'
import JobApplicants from './pages/JobApplicants'
import Dashboard from './pages/Dashboard'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<HomeRedirect />} />

          {/* job seeker */}
          <Route path="/jobs" element={<ProtectedRoute role="JOB_SEEKER"><BrowseJobs /></ProtectedRoute>} />
          <Route path="/my-applications" element={<ProtectedRoute role="JOB_SEEKER"><MyApplications /></ProtectedRoute>} />

          {/* shared - job detail viewable by either role */}
          <Route path="/jobs/:id" element={<ProtectedRoute><JobDetail /></ProtectedRoute>} />

          {/* recruiter */}
          <Route path="/dashboard" element={<ProtectedRoute role="RECRUITER"><Dashboard /></ProtectedRoute>} />
          <Route path="/my-jobs" element={<ProtectedRoute role="RECRUITER"><MyJobs /></ProtectedRoute>} />
          <Route path="/post-job" element={<ProtectedRoute role="RECRUITER"><PostJob /></ProtectedRoute>} />
          <Route path="/jobs/:id/applicants" element={<ProtectedRoute role="RECRUITER"><JobApplicants /></ProtectedRoute>} />

          {/* shared */}
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
