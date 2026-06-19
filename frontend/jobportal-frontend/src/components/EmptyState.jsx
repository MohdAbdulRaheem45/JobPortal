export default function EmptyState({ title, body, action }) {
  return (
    <div className="text-center py-16 px-6 border border-dashed border-line rounded-xl">
      <p className="font-display text-lg text-ink mb-1">{title}</p>
      <p className="text-sm text-slate max-w-sm mx-auto">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
