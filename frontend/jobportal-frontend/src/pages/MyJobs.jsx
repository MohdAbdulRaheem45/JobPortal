import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Shell from '../components/Shell'
import { getMyJobs, closeJob } from '../api/jobs'
import StatusBadge from '../components/StatusBadge'
import StatusEdge from '../components/StatusEdge'
import EmptyState from '../components/EmptyState'
import { Button } from '../components/Form'
import Alert from '../components/Alert'

export default function MyJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [closingId, setClosingId] = useState(null)

  const load = () => {
    setLoading(true)
    getMyJobs()
      .then((res) => setJobs(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleClose = async (id) => {
    setError('')
    setClosingId(id)
    try {
      await closeJob(id)
      setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status: 'CLOSED' } : j)))
    } catch (err) {
      setError(err.response?.data || 'Could not close this job')
    } finally {
      setClosingId(null)
    }
  }

  return (
    <Shell>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-[28px] font-medium text-ink">My postings</h1>
          <p className="text-slate text-sm mt-1">Manage roles you've published and review applicants.</p>
        </div>
        <Link to="/post-job">
          <Button>Post a job</Button>
        </Link>
      </header>

      <Alert type="error">{error}</Alert>

      {loading ? (
        <div className="space-y-3 mt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-paperdim animate-pulse" />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <EmptyState
          title="No postings yet"
          body="Publish your first role and candidates will be able to find and apply to it right away."
          action={
            <Link to="/post-job">
              <Button>Post your first job</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <StatusEdge status={job.status} key={job.id}>
              <div className="bg-white border border-line rounded-xl px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link to={`/jobs/${job.id}`} className="font-display text-lg text-ink font-medium hover:underline">
                      {job.title}
                    </Link>
                    <p className="text-sm text-slate mt-0.5">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <StatusBadge status={job.status} />
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <Link to={`/jobs/${job.id}/applicants`}>
                    <Button variant="secondary" className="text-[13px] py-2">
                      View applicants
                    </Button>
                  </Link>
                  {job.status === 'OPEN' && (
                    <button
                      onClick={() => handleClose(job.id)}
                      disabled={closingId === job.id}
                      className="text-xs text-clay hover:underline disabled:opacity-50"
                    >
                      {closingId === job.id ? 'Closing…' : 'Close this posting'}
                    </button>
                  )}
                </div>
              </div>
            </StatusEdge>
          ))}
        </div>
      )}
    </Shell>
  )
}
