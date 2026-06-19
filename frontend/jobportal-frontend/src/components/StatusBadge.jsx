const STATUS_STYLES = {
  OPEN: 'bg-confirmed/10 text-confirmed border-confirmed/30',
  CLOSED: 'bg-slate/10 text-slate border-slate/30',
  PENDING: 'bg-amber/15 text-amber border-amber/40',
  ACCEPTED: 'bg-confirmed/10 text-confirmed border-confirmed/30',
  REJECTED: 'bg-clay/10 text-clay border-clay/30',
}

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'bg-slate/10 text-slate border-slate/30'
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border font-mono uppercase tracking-wide ${style}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
