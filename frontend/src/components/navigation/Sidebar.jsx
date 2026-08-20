import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import {
  BrainCircuit, LayoutDashboard, MessageSquarePlus,
  ClipboardList, FileText, History, User, LogOut, X, Briefcase, Sparkles
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

const NAV_ITEMS = [
  { to: '/dashboard',   icon: LayoutDashboard,   label: 'Dashboard' },
  { to: '/interviews',  icon: ClipboardList,      label: 'Interviews' },
  { to: '/interviews/new', icon: MessageSquarePlus, label: 'New Interview' },
  { to: '/sessions',    icon: History,            label: 'History' },
  { to: '/resumes',     icon: FileText,           label: 'Resumes' },
  { to: '/jobs',        icon: Briefcase,          label: 'Jobs' },
  { to: '/jobs/recommended', icon: Sparkles,       label: 'Recommendations' },
  { to: '/profile',     icon: User,               label: 'Profile' },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white/[0.02] backdrop-blur-xl border-r border-white/[0.06]">
        <SidebarContent user={user} onLogout={handleLogout} />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-30 h-full w-72 bg-[#0f0f1a]/95 backdrop-blur-2xl border-r border-white/[0.06] flex flex-col lg:hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06]"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent user={user} onLogout={handleLogout} onNavClick={onClose} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({ user, onLogout, onNavClick }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/[0.06]">
        <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-[0_0_16px_rgba(244,63,94,0.3)]">
          <BrainCircuit className="w-5 h-5 text-white" />
        </div>
        <span className="font-display font-bold text-lg text-white tracking-tight">
          Interview<span className="text-rose-400">AI</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavClick}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-rose-500/15 text-rose-300 border border-rose-500/25 shadow-[0_0_12px_rgba(244,63,94,0.1)]'
                  : 'text-white/40 hover:text-white hover:bg-white/[0.04]'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={clsx('w-5 h-5', isActive ? 'text-rose-400' : '')} />
                <span className="flex-1">{label}</span>
                {label === 'Jobs' && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/20 uppercase tracking-tight">
                    Soon
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-[0_0_12px_rgba(244,63,94,0.25)]">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-white/30 truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={onLogout}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg
                     text-sm font-medium text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-all">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
