import api from './client'

// backend returns: register -> plain string "Successfully Registered"
export const register = (data) => api.post('/auth/register', data)

// backend returns: login -> plain string (the raw JWT token, NOT json)
export const login = (data) => api.post('/auth/login', data)
