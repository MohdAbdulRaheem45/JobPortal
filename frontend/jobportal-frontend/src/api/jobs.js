import api from './client'

export const getAllJobs = (page = 0, size = 10) =>
  api.get('/jobs', { params: { page, size } })

export const searchJobs = (q, location, page = 0, size = 10) =>
  api.get('/jobs/search', { params: { q, location, page, size } })

export const getJobById = (id) => api.get(`/jobs/${id}`)

export const getMyJobs = () => api.get('/jobs/my')

export const createJob = (data) => api.post('/jobs', data)

export const closeJob = (id) => api.put(`/jobs/${id}/close`)
