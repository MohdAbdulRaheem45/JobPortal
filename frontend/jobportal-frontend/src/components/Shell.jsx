import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ICONS = {
  briefcase: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3.75 8.25h16.5M3.75 8.25v9a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-9M3.75 8.25 5.5 4.75a1.5 1.5 0 011.34-.83h10.32a1.5 1.5 0 011.34.83l1.75 3.5M9 12v.01M15 12v.01" />
  ),
  plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 4.5v15m7.5-7.5h-15" />,
  list: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.008M3.75 12h.008m-.008 5.25h.008" />
  ),
  doc: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5A3.375 3.375 0 0010.125 2.25H8.25M19.5 14.25v5.625a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25V4.5a2.25 2.25 0 012.25-2.25h5.379a1.125 1.125 0 01.795.33l5.121 5.121a1.125 1.125 0 01.33.795z" />
  ),
  bell: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M14.857 17.082a23.85 23.85 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  ),
  grid: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  ),
  user: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.964 0a9 9 0 10-11.964 0m11.964 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  ),
}

function Icon({ name, className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[14.5px] transition-colors ${
          isActive
            ? 'bg-ink text-paper font-medium'
            : 'text-ink/70 hover:bg-paperdim hover:text-ink'
        }`
      }
    >
      <Icon name={icon} className="w-[18px] h-[18px] flex-shrink-0" />
      {label}
    </NavLink>
  )
}

export default function Shell({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const isRecruiter = user?.role === 'RECRUITER'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex bg-paper">
      <aside className="w-64 flex-shrink-0 border-r border-line flex flex-col h-screen sticky top-0">
        <div className="px-6 py-6">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-semibold tracking-tight">Job</span>
            <span className="font-display text-2xl italic text-amber">Portal</span>
          </div>
          <p className="text-xs text-slate mt-0.5 font-mono">
            {isRecruiter ? 'recruiter desk' : 'seeker desk'}
          </p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {isRecruiter ? (
            <>
              <NavItem to="/dashboard" icon="grid" label="Dashboard" />
              <NavItem to="/my-jobs" icon="list" label="My postings" />
              <NavItem to="/post-job" icon="plus" label="Post a job" />
            </>
          ) : (
            <>
              <NavItem to="/jobs" icon="briefcase" label="Browse jobs" />
              <NavItem to="/my-applications" icon="doc" label="My applications" />
            </>
          )}
          <NavItem to="/notifications" icon="bell" label="Notifications" />
          <NavItem to="/profile" icon="user" label="Profile" />
        </nav>

        <div className="px-3 pb-5 pt-3 border-t border-line">
          <div className="px-3.5 py-2.5">
            <p className="text-sm font-medium text-ink truncate">{user?.username}</p>
            <p className="text-xs text-slate truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3.5 py-2.5 rounded-lg text-[14.5px] text-clay hover:bg-clay/10 transition-colors"
          >
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="max-w-5xl mx-auto px-8 py-10">{children}</div>
      </main>
    </div>
  )
}
