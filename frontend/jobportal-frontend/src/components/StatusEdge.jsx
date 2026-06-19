const EDGE_COLORS = {
  OPEN: '#3F7E5C',
  CLOSED: '#6B7280',
  PENDING: '#E8A33D',
  ACCEPTED: '#3F7E5C',
  REJECTED: '#B5533C',
}

// the signature element: every card carries a colored left edge that
// encodes its real state, like a ledger margin mark
export default function StatusEdge({ status, children }) {
  const color = EDGE_COLORS[status] || '#6B7280'
  return (
    <div className="relative pl-4">
      <span
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
