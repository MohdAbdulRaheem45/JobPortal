import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Shell from '../components/Shell'
import { getJobById } from '../api/jobs'
import { applyToJob } from '../api/applications'
import { useAuth } from '../context/AuthContext'
import StatusBadge from '../components/StatusBadge'
import { Field, Textarea, Button } from '../components/Form'
import Alert from '../components/Alert'

const JOB_TYPE_LABEL = {
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  INTERNSHIP: 'Internship',
}

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showApply, setShowApply] = useState(false)
  const [resume, setResume] = useState(null)
  const [coverLetter, setCoverLetter] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getJobById(id)
      .then((res) => setJob(res.data))
      .finally(() => setLoading(false))
  }, [id])

  const handleApply = async (e) => {
    e.preventDefault()
    setError('')
    if (!resume) {
      setError('Attach your resume as a PDF before submitting.')
      return
    }
    if (resume.type !== 'application/pdf') {
      setError('Resume must be a PDF file.')
      return
    }
    setSubmitting(true)
    try {
      await applyToJob(id, resume, coverLetter)
      setSuccess('Application submitted. You can track it from My applications.')
      setShowApply(false)
    } catch (err) {
      setError(err.response?.data || 'Could not submit application')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Shell>
        <div className="h-48 rounded-xl bg-paperdim animate-pulse" />
      </Shell>
    )
  }

  if (!job) {
    return (
      <Shell>
        <Alert type="error">Job not found.</Alert>
      </Shell>
    )
  }

  const isSeeker = user?.role === 'JOB_SEEKER'
  const isClosed = job.status === 'CLOSED'

  return (
    <Shell>
      <button onClick={() => navigate(-1)} className="text-sm text-slate hover:text-ink mb-6">
        ← Back
      </button>

      <div className="bg-white border border-line rounded-2xl p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-[28px] font-medium text-ink">{job.title}</h1>
            <p className="text-slate mt-1">
              {job.company} · {job.location}
            </p>
          </div>
          <StatusBadge status={job.status} />
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-5">
          <span className="text-xs px-2.5 py-1 rounded-full bg-paperdim text-ink/70 font-medium">
            {JOB_TYPE_LABEL[job.jobType] || job.jobType}
          </span>
          <span className="text-sm font-mono text-ink">{job.salaryRange}</span>
          <span className="text-sm text-slate">
            Apply by {new Date(job.deadline).toLocaleDateString()}
          </span>
        </div>

        <div className="h-px bg-line my-6" />

        <h2 className="text-sm font-medium text-ink/80 mb-2">About this role</h2>
        <p className="text-[15px] text-ink/90 leading-relaxed whitespace-pre-wrap">{job.description}</p>

        <p className="text-xs text-slate mt-6 font-mono">Posted by {job.postedByName}</p>
      </div>

      <Alert type="success">{success}</Alert>

      {isSeeker && !isClosed && !success && (
        <div className="mt-6">
          {!showApply ? (
            <Button onClick={() => setShowApply(true)}>Apply for this role</Button>
          ) : (
            <form onSubmit={handleApply} className="bg-white border border-line rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-lg text-ink">Submit your application</h3>
              <Alert type="error">{error}</Alert>
              <Field label="Resume (PDF only)">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="block w-full text-sm text-ink/80 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-paperdim file:text-ink file:text-sm file:font-medium hover:file:bg-line file:cursor-pointer cursor-pointer"
                />
              </Field>
              <Field label="Cover letter (optional)">
                <Textarea
                  rows={4}
                  placeholder="Tell the recruiter why you're a fit…"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                />
              </Field>
              <div className="flex gap-3">
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Submit application'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setShowApply(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      {isClosed && isSeeker && (
        <div className="mt-6">
          <Alert type="info">This role is no longer accepting applications.</Alert>
        </div>
      )}
    </Shell>
  )
}
