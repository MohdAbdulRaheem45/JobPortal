import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Field, Input, Button } from '../components/Form'
import Alert from '../components/Alert'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="flex items-baseline gap-1.5 justify-center">
            <span className="font-display text-3xl font-semibold tracking-tight">Job</span>
            <span className="font-display text-3xl italic text-amber">Portal</span>
          </div>
          <p className="text-sm text-slate mt-2">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-line rounded-2xl p-7 shadow-sm">
          <Alert type="error">{error}</Alert>
          <Field label="Email">
            <Input
              type="email"
              required
              autoFocus
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Field>
          <Field label="Password">
            <Input
              type="password"
              required
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </Field>
          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <p className="text-center text-sm text-slate mt-6">
          New here?{' '}
          <Link to="/register" className="text-ink font-medium underline underline-offset-2">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
