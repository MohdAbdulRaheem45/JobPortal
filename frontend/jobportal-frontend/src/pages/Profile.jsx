import { useState } from 'react'
import Shell from '../components/Shell'
import { useAuth } from '../context/AuthContext'
import { updateProfile } from '../api/misc'
import { Field, Input, Button } from '../components/Form'
import Alert from '../components/Alert'

export default function Profile() {
  const { user, refreshProfile } = useAuth()
  const [form, setForm] = useState({ username: user?.username || '', phone: user?.phone || '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await updateProfile(form)
      await refreshProfile()
      setSuccess('Profile updated')
    } catch (err) {
      setError(err.response?.data || 'Could not update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Shell>
      <header className="mb-8">
        <h1 className="font-display text-[28px] font-medium text-ink">Profile</h1>
        <p className="text-slate text-sm mt-1">Keep your contact details current.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white border border-line rounded-2xl p-7 space-y-4 max-w-md">
        <Alert type="error">{error}</Alert>
        <Alert type="success">{success}</Alert>

        <Field label="Email">
          <Input value={user?.email || ''} disabled className="opacity-60 cursor-not-allowed" />
        </Field>
        <Field label="Role">
          <Input value={user?.role || ''} disabled className="opacity-60 cursor-not-allowed" />
        </Field>
        <Field label="Full name">
          <Input
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </Field>
        <Field label="Phone">
          <Input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Field>

        <Button type="submit" disabled={loading}>
          {loading ? 'Saving…' : 'Save changes'}
        </Button>
      </form>
    </Shell>
  )
}
