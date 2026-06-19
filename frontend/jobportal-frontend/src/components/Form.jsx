export function Field({ label, children, error }) {
  return (
    <label className="block">
      <span className="block text-[13px] font-medium text-ink/80 mb-1.5">{label}</span>
      {children}
      {error && <span className="block text-xs text-clay mt-1.5">{error}</span>}
    </label>
  )
}

export function Input(props) {
  return (
    <input
      {...props}
      className={`w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-[14.5px] text-ink placeholder:text-slate/60 focus:border-ink focus:ring-1 focus:ring-ink transition-colors outline-none ${props.className || ''}`}
    />
  )
}

export function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-[14.5px] text-ink placeholder:text-slate/60 focus:border-ink focus:ring-1 focus:ring-ink transition-colors outline-none resize-none ${props.className || ''}`}
    />
  )
}

export function Select(props) {
  return (
    <select
      {...props}
      className={`w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-[14.5px] text-ink focus:border-ink focus:ring-1 focus:ring-ink transition-colors outline-none ${props.className || ''}`}
    />
  )
}

export function Button({ variant = 'primary', className = '', children, ...props }) {
  const variants = {
    primary: 'bg-ink text-paper hover:bg-ink/90',
    secondary: 'bg-white text-ink border border-line hover:bg-paperdim',
    danger: 'bg-clay text-white hover:bg-clay/90',
    ghost: 'text-ink/70 hover:bg-paperdim',
  }
  return (
    <button
      {...props}
      className={`px-4 py-2.5 rounded-lg text-[14.5px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
