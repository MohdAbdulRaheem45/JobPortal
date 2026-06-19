import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { login as loginApi, register as registerApi } from '../api/auth'
import { getMyProfile } from '../api/misc'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // { id, username, email, phone, role, createdAt }
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async () => {
    try {
      const res = await getMyProfile()
      setUser(res.data)
    } catch (err) {
      // token invalid or expired
      localStorage.removeItem('jp_token')
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('jp_token')
    if (token) {
      loadProfile().finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [loadProfile])

  const login = async (email, password) => {
    const res = await loginApi({ email, password })
    // backend returns raw token string as response body
    const token = res.data
    localStorage.setItem('jp_token', token)
    await loadProfile()
  }

  const register = async (data) => {
    await registerApi(data)
  }

  const logout = () => {
    localStorage.removeItem('jp_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshProfile: loadProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
