import api from './client'

export const getMyNotifications = () => api.get('/notifications/my')
export const markNotificationRead = (id) => api.put(`/notifications/${id}/read`)

export const getDashboard = () => api.get('/dashboard')

export const getMyProfile = () => api.get('/users/me')
export const updateProfile = (data) => api.put('/users/me', data)
