import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Field, Input, Button } from '../components/Form'
import Alert from '../components/Alert'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 'JOB_SEEKER',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form)
      setSuccess('Account created. Redirecting to sign in…')
      setTimeout(() => navigate('/login'), 1200)
    } catch (err) {
      setError(err.response?.data || 'Could not create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-6 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="flex items-baseline gap-1.5 justify-center">
            <span className="font-display text-3xl font-semibold tracking-tight">Job</span>
            <span className="font-display text-3xl italic text-amber">Portal</span>
          </div>
          <p className="text-sm text-slate mt-2">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-line rounded-2xl p-7 shadow-sm">
          <Alert type="error">{error}</Alert>
          <Alert type="success">{success}</Alert>

          <Field label="I am a">
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'JOB_SEEKER', label: 'Job seeker' },
                { value: 'RECRUITER', label: 'Recruiter' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, role: opt.value })}
                  className={`px-3 py-2.5 rounded-lg text-[13.5px] font-medium border transition-colors ${
                    form.role === opt.value
                      ? 'bg-ink text-paper border-ink'
                      : 'bg-white text-ink/70 border-line hover:bg-paperdim'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Full name">
            <Input
              required
              placeholder="Jordan Lee"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Field>
          <Field label="Phone">
            <Input
              required
              placeholder="9876543210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
            {loading ? 'Creating account…' : 'Create account'}
          </Button>
        </form>

        <p className="text-center text-sm text-slate mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-ink font-medium underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
