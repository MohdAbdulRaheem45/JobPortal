import { useEffect, useState } from 'react'
import Shell from '../components/Shell'
import { getDashboard } from '../api/misc'

function MetricCard({ label, value, color }) {
  return (
    <div className="bg-white border border-line rounded-2xl px-6 py-5">
      <p className="text-xs text-slate font-mono uppercase tracking-wide">{label}</p>
      <p className="font-display text-3xl font-medium mt-2" style={{ color: color || '#1A1F2E' }}>
        {value ?? '—'}
      </p>
    </div>
  )
}

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Shell>
      <header className="mb-8">
        <h1 className="font-display text-[28px] font-medium text-ink">Dashboard</h1>
        <p className="text-slate text-sm mt-1">A snapshot of postings and applications across the platform.</p>
      </header>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-paperdim animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-sm font-medium text-ink/70 mb-3">Jobs</p>
            <div className="grid grid-cols-3 gap-4">
              <MetricCard label="Total jobs" value={data?.totalJobs} />
              <MetricCard label="Open" value={data?.openJobs} color="#3F7E5C" />
              <MetricCard label="Closed" value={data?.closedJobs} color="#6B7280" />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-ink/70 mb-3">Applications</p>
            <div className="grid grid-cols-4 gap-4">
              <MetricCard label="Total" value={data?.totalApplications} />
              <MetricCard label="Pending" value={data?.pendingApplications} color="#E8A33D" />
              <MetricCard label="Accepted" value={data?.acceptedApplications} color="#3F7E5C" />
              <MetricCard label="Rejected" value={data?.rejectedApplications} color="#B5533C" />
            </div>
          </div>
        </>
      )}
    </Shell>
  )
}
