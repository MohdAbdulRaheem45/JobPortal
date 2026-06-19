import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Shell from '../components/Shell'
import { getApplicationsByJob, updateApplicationStatus } from '../api/applications'
import StatusBadge from '../components/StatusBadge'
import EmptyState from '../components/EmptyState'
import Alert from '../components/Alert'
import { getResumeUrl } from '../utils/resume'

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export default function JobApplicants() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actingId, setActingId] = useState(null)

  const load = () => {
    setLoading(true)
    setError('')
    getApplicationsByJob(id)
      .then((res) => setApps(res.data))
      .catch((err) => setError(err.response?.data || 'Could not load applicants'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleDecision = async (applicationId, status) => {
    setActingId(applicationId)
    setError('')
    try {
      await updateApplicationStatus(applicationId, status)
      setApps((prev) => prev.map((a) => (a.id === applicationId ? { ...a, status } : a)))
    } catch (err) {
      setError(err.response?.data || 'Could not update status')
    } finally {
      setActingId(null)
    }
  }

  return (
    <Shell>
      <button onClick={() => navigate('/my-jobs')} className="text-sm text-slate hover:text-ink mb-6">
        ← Back to my postings
      </button>

      <header className="mb-8">
        <h1 className="font-display text-[28px] font-medium text-ink">Applicants</h1>
        <p className="text-slate text-sm mt-1">Review resumes and move candidates forward.</p>
      </header>

      <Alert type="error">{error}</Alert>

      {loading ? (
        <div className="space-y-3 mt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-paperdim animate-pulse" />
          ))}
        </div>
      ) : apps.length === 0 ? (
        <EmptyState title="No applicants yet" body="Once candidates apply, their resumes and cover letters will show up here." />
      ) : (
        <div className="space-y-3">
          {apps.map((app) => (
            <div key={app.id} className="bg-white border border-line rounded-xl px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg text-ink font-medium">{app.applicantName}</h3>
                  <p className="text-sm text-slate mt-0.5">{app.applicantEmail}</p>
                  <p className="text-xs text-slate mt-1 font-mono">
                    Applied {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={app.status} />
              </div>

              {app.coverLetter && (
                <p className="text-sm text-ink/80 mt-3 pt-3 border-t border-line">{app.coverLetter}</p>
              )}

              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-line">
                {app.resumePath ? (
                  <a
                    href={getResumeUrl(app.resumePath)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-paperdim text-ink/80 hover:bg-line transition-colors"
                  >
                    <EyeIcon />
                    View Resume
                  </a>
                ) : (
                  <span className="text-xs text-slate">No resume on file</span>
                )}
                {app.status === 'PENDING' && (
                  <div className="flex gap-2 ml-auto">
                    <button
                      onClick={() => handleDecision(app.id, 'ACCEPTED')}
                      disabled={actingId === app.id}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-confirmed/10 text-confirmed hover:bg-confirmed/20 transition-colors disabled:opacity-50"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecision(app.id, 'REJECTED')}
                      disabled={actingId === app.id}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-clay/10 text-clay hover:bg-clay/20 transition-colors disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Shell>
  )
}
