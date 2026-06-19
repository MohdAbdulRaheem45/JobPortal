import { useEffect, useState } from 'react'
import Shell from '../components/Shell'
import { getMyApplications, withdrawApplication } from '../api/applications'
import StatusBadge from '../components/StatusBadge'
import EmptyState from '../components/EmptyState'
import { Button } from '../components/Form'
import Alert from '../components/Alert'
import { Link } from 'react-router-dom'

const STAGES = ['PENDING', 'ACCEPTED']
const REJECTED_STAGES = ['PENDING', 'REJECTED']

function StatusThread({ status }) {
  const stages = status === 'REJECTED' ? REJECTED_STAGES : STAGES
  const colorFor = (s) => {
    if (s === 'PENDING') return '#E8A33D'
    if (s === 'ACCEPTED') return '#3F7E5C'
    if (s === 'REJECTED') return '#B5533C'
    return '#6B7280'
  }
  return (
    <div className="flex items-center gap-1.5 mt-3">
      {stages.map((s, i) => {
        const reached = s === status || (status === 'ACCEPTED' && s === 'PENDING') || (status === 'REJECTED' && s === 'PENDING')
        return (
          <div key={s} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: reached ? colorFor(s) : '#E4DFD3' }}
            />
            {i < stages.length - 1 && <span className="w-6 h-px bg-line" />}
          </div>
        )
      })}
    </div>
  )
}

export default function MyApplications() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [withdrawingId, setWithdrawingId] = useState(null)

  const load = () => {
    setLoading(true)
    getMyApplications()
      .then((res) => setApps(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleWithdraw = async (id) => {
    setError('')
    setWithdrawingId(id)
    try {
      await withdrawApplication(id)
      setApps((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      setError(err.response?.data || 'Could not withdraw application')
    } finally {
      setWithdrawingId(null)
    }
  }

  return (
    <Shell>
      <header className="mb-8">
        <h1 className="font-display text-[28px] font-medium text-ink">My applications</h1>
        <p className="text-slate text-sm mt-1">Track where each application stands.</p>
      </header>

      <Alert type="error">{error}</Alert>

      {loading ? (
        <div className="space-y-3 mt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-paperdim animate-pulse" />
          ))}
        </div>
      ) : apps.length === 0 ? (
        <EmptyState
          title="No applications yet"
          body="Once you apply to a role, you'll be able to track its status here — from submitted to a final decision."
          action={
            <Link to="/jobs">
              <Button>Browse open roles</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {apps.map((app) => (
            <div key={app.id} className="bg-white border border-line rounded-xl px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link to={`/jobs/${app.jobId}`} className="font-display text-lg text-ink font-medium hover:underline">
                    {app.jobTitle}
                  </Link>
                  <p className="text-sm text-slate mt-0.5">
                    Applied {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                  <StatusThread status={app.status} />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={app.status} />
                  {app.status === 'PENDING' && (
                    <button
                      onClick={() => handleWithdraw(app.id)}
                      disabled={withdrawingId === app.id}
                      className="text-xs text-clay hover:underline disabled:opacity-50"
                    >
                      {withdrawingId === app.id ? 'Withdrawing…' : 'Withdraw'}
                    </button>
                  )}
                </div>
              </div>
              {app.coverLetter && (
                <p className="text-sm text-ink/70 mt-3 pt-3 border-t border-line italic">
                  {app.coverLetter}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </Shell>
  )
}
