import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Shell from '../components/Shell'
import { createJob } from '../api/jobs'
import { Field, Input, Textarea, Select, Button } from '../components/Form'
import Alert from '../components/Alert'

export default function PostJob() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salaryRange: '',
    jobType: 'FULL_TIME',
    deadline: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // backend expects LocalDateTime - append time portion to the date input
      const payload = { ...form, deadline: `${form.deadline}T23:59:59` }
      const res = await createJob(payload)
      navigate(`/jobs/${res.data.id}`)
    } catch (err) {
      setError(err.response?.data || 'Could not create job posting')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Shell>
      <header className="mb-8">
        <h1 className="font-display text-[28px] font-medium text-ink">Post a new role</h1>
        <p className="text-slate text-sm mt-1">Fill in the details candidates will see.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white border border-line rounded-2xl p-7 space-y-5 max-w-2xl">
        <Alert type="error">{error}</Alert>

        <Field label="Job title">
          <Input
            required
            placeholder="Senior Backend Engineer"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Company">
            <Input
              required
              placeholder="Acme Corp"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </Field>
          <Field label="Location">
            <Input
              required
              placeholder="Hyderabad, IN"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Job type">
            <Select value={form.jobType} onChange={(e) => setForm({ ...form, jobType: e.target.value })}>
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="INTERNSHIP">Internship</option>
            </Select>
          </Field>
          <Field label="Salary range">
            <Input
              required
              placeholder="₹12L – ₹18L"
              value={form.salaryRange}
              onChange={(e) => setForm({ ...form, salaryRange: e.target.value })}
            />
          </Field>
        </div>

        <Field label="Application deadline">
          <Input
            type="date"
            required
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
        </Field>

        <Field label="Description">
          <Textarea
            required
            rows={6}
            placeholder="Responsibilities, requirements, and what makes this role interesting…"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Field>

        <Button type="submit" disabled={loading}>
          {loading ? 'Publishing…' : 'Publish job'}
        </Button>
      </form>
    </Shell>
  )
}
