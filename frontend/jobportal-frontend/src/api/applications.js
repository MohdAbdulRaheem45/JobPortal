import api from './client'

// multipart/form-data: resume (file, required) + coverLetter (string, optional)
export const applyToJob = (jobId, resumeFile, coverLetter) => {
  const formData = new FormData()
  formData.append('resume', resumeFile)
  if (coverLetter) formData.append('coverLetter', coverLetter)
  return api.post(`/applications/${jobId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const getMyApplications = () => api.get('/applications/my')

export const getApplicationsByJob = (jobId) => api.get(`/applications/job/${jobId}`)

export const withdrawApplication = (applicationId) =>
  api.delete(`/applications/${applicationId}`)

// status: PENDING | ACCEPTED | REJECTED, sent as query param per backend
export const updateApplicationStatus = (applicationId, status) =>
  api.put(`/applications/${applicationId}/status`, null, { params: { status } })
