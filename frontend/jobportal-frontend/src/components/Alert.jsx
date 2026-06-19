export default function Alert({ type = 'error', children }) {
  if (!children) return null
  const styles = {
    error: 'bg-clay/10 text-clay border-clay/30',
    success: 'bg-confirmed/10 text-confirmed border-confirmed/30',
    info: 'bg-amber/10 text-amber border-amber/30',
  }
  return (
    <div className={`px-4 py-3 rounded-lg border text-sm ${styles[type]}`} role="alert">
      {children}
    </div>
  )
}
