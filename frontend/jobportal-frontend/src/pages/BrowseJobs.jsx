import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Shell from '../components/Shell'
import { getAllJobs, searchJobs } from '../api/jobs'
import { Input, Button } from '../components/Form'
import EmptyState from '../components/EmptyState'
import StatusEdge from '../components/StatusEdge'

const JOB_TYPE_LABEL = {
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  INTERNSHIP: 'Internship',
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Posted today'
  if (days === 1) return 'Posted yesterday'
  return `Posted ${days}d ago`
}

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([])
  const [q, setQ] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)

  const fetchJobs = useCallback(async (pageNum = 0) => {
    setLoading(true)
    try {
      const isSearching = q.trim() !== '' || location.trim() !== ''
      const res = isSearching
        ? await searchJobs(q, location, pageNum, 10)
        : await getAllJobs(pageNum, 10)
      setJobs(res.data)
      setPage(pageNum)
    } finally {
      setLoading(false)
    }
  }, [q, location])

  useEffect(() => {
    fetchJobs(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchJobs(0)
  }

  return (
    <Shell>
      <header className="mb-8">
        <h1 className="font-display text-[28px] font-medium text-ink">Browse open roles</h1>
        <p className="text-slate text-sm mt-1">Search by title or location to narrow things down.</p>
      </header>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <Input
          placeholder="Job title, e.g. Backend Engineer"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="max-w-[200px]"
        />
        <Button type="submit">Search</Button>
      </form>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-paperdim animate-pulse" />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <EmptyState
          title="No roles match yet"
          body="Try clearing your search, or check back soon — new postings show up here as soon as recruiters publish them."
        />
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <Link to={`/jobs/${job.id}`} key={job.id} className="block group">
              <StatusEdge status={job.status}>
                <div className="bg-white border border-line rounded-xl px-5 py-4 group-hover:border-ink/30 group-hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg text-ink font-medium">{job.title}</h3>
                      <p className="text-sm text-slate mt-0.5">
                        {job.company} · {job.location}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate whitespace-nowrap pt-1">
                      {timeAgo(job.postedAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-paperdim text-ink/70 font-medium">
                      {JOB_TYPE_LABEL[job.jobType] || job.jobType}
                    </span>
                    <span className="text-xs font-mono text-slate">{job.salaryRange}</span>
                  </div>
                </div>
              </StatusEdge>
            </Link>
          ))}
        </div>
      )}

      {!loading && jobs.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <Button variant="secondary" disabled={page === 0} onClick={() => fetchJobs(page - 1)}>
            ← Previous
          </Button>
          <span className="text-sm text-slate font-mono">Page {page + 1}</span>
          <Button variant="secondary" disabled={jobs.length < 10} onClick={() => fetchJobs(page + 1)}>
            Next →
          </Button>
        </div>
      )}
    </Shell>
  )
}
