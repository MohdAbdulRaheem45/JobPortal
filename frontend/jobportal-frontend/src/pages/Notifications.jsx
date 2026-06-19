import { useEffect, useState } from 'react'
import Shell from '../components/Shell'
import { getMyNotifications, markNotificationRead } from '../api/misc'
import EmptyState from '../components/EmptyState'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export default function Notifications() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    getMyNotifications()
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleRead = async (id) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    try {
      await markNotificationRead(id)
    } catch {
      load()
    }
  }

  return (
    <Shell>
      <header className="mb-8">
        <h1 className="font-display text-[28px] font-medium text-ink">Notifications</h1>
        <p className="text-slate text-sm mt-1">Updates on applications and postings land here.</p>
      </header>

      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-paperdim animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState title="Nothing here yet" body="You'll see application updates and recruiter activity in this list." />
      ) : (
        <div className="space-y-2">
          {items.map((n) => (
            <button
              key={n.id}
              onClick={() => !n.read && handleRead(n.id)}
              className={`w-full text-left flex items-start gap-3 px-5 py-4 rounded-xl border transition-colors ${
                n.read ? 'bg-white border-line' : 'bg-amber/5 border-amber/30 hover:bg-amber/10'
              }`}
            >
              {!n.read && <span className="w-2 h-2 rounded-full bg-amber mt-1.5 flex-shrink-0" />}
              <div className="flex-1">
                <p className={`text-[14.5px] ${n.read ? 'text-ink/70' : 'text-ink font-medium'}`}>{n.message}</p>
                <p className="text-xs text-slate mt-1 font-mono">{timeAgo(n.createdAt)}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </Shell>
  )
}
