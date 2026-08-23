import { useEffect, useState } from 'react';
import Iridescence from '../../components/Iridescence';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy, ClipboardList, TrendingUp, Star,
  Plus, ChevronRight, Clock, Building2, ArrowRight,
  BrainCircuit,
} from 'lucide-react';
import { userAPI } from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import {
  RadialBarChart, RadialBar, ResponsiveContainer,
} from 'recharts';

/* ── Glassmorphic Card ──────────────────────────────────────────── */
function Glass({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl
      bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]
      ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      {children}
    </div>
  );
}

/* ── Stat Card ──────────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, sub, gradient, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Glass className="p-6 group hover:border-brand-400/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.14)] transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-slate-300 text-sm font-medium">{label}</p>
          <p className="text-3xl font-display font-bold text-white mt-1">{value}</p>
          {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
        </div>
      </div>
    </Glass>
  </motion.div>
);

/* ══════════════════════════════════════════════════════════════════════
    MAIN DASHBOARD
══════════════════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userAPI.getDashboard()
      .then(({ data }) => setStats(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const scoreData = [
    { name: 'Score', value: stats?.averageScore ?? 0, fill: '#6366f1' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Hero Banner with Iridescence ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden"
        style={{ minHeight: '200px' }}
      >
        <div className="absolute inset-0 z-0">
          <Iridescence
            color={[0.24705882352941178, 0.3176470588235294, 0.8313725490196079]}
            mouseReact
            amplitude={0.1}
            speed={1}
          />
        </div>

        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#090b14]/90 via-[#090b14]/65 to-[#090b14]/25" />

        <div className="relative z-[2] flex items-center justify-between p-8 lg:p-10" style={{ minHeight: '200px' }}>
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-300/30 bg-brand-500/15 px-3 py-1.5 text-xs font-semibold text-brand-100 backdrop-blur-sm">
              <BrainCircuit className="h-3.5 w-3.5 text-brand-200" />
              InterviewAI workspace
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white">
              Good day, <span className="text-brand-200">{user?.name?.split(' ')[0] || 'there'}</span>
            </h2>
            <p className="text-slate-200 mt-2 text-lg max-w-md">
              Ready to practice? Let&apos;s crush your next interview.
            </p>
          </div>

          <Link to="/interviews/new"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-xl
                       bg-gradient-to-r from-brand-600 to-violet-500
                       text-white font-semibold text-sm
                       shadow-[0_0_20px_rgba(99,102,241,0.35)]
                       hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]
                       active:scale-95 transition-all duration-200">
            <Plus className="w-4 h-4" />
            New Interview
          </Link>
        </div>
      </motion.div>

      {/* ── Stats Grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={ClipboardList} label="Total Interviews" gradient="from-brand-500 to-violet-500"
          value={loading ? '—' : stats?.totalSessions ?? 0}
          sub="All time sessions" delay={0.1}
        />
        <StatCard
          icon={Trophy} label="Completed" gradient="from-violet-500 to-purple-600"
          value={loading ? '—' : stats?.completedSessions ?? 0}
          sub="Finished sessions" delay={0.15}
        />
        <StatCard
          icon={TrendingUp} label="Avg. Score" gradient="from-blue-500 to-brand-600"
          value={loading ? '—' : `${stats?.averageScore ?? 0}%`}
          sub="Across all sessions" delay={0.2}
        />
        <StatCard
          icon={Star} label="Best Score" gradient="from-amber-500 to-orange-600"
          value={loading ? '—' : `${stats?.bestScore ?? 0}%`}
          sub="Personal best" delay={0.25}
        />
      </div>

      {/* ── Charts + Recent ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Score Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Glass className="p-6 flex flex-col items-center justify-center h-full">
            <h3 className="text-sm font-medium text-slate-300 mb-4">Average Performance</h3>
            <ResponsiveContainer width="100%" height={160}>
              <RadialBarChart innerRadius="60%" outerRadius="90%" data={scoreData} startAngle={90} endAngle={-270}>
                <RadialBar background={{ fill: 'rgba(255,255,255,0.06)' }} dataKey="value" cornerRadius={8} />
              </RadialBarChart>
            </ResponsiveContainer>
            <p className="text-4xl font-display font-bold bg-gradient-to-r from-brand-300 to-violet-300 bg-clip-text text-transparent -mt-4">
              {stats?.averageScore ?? 0}%
            </p>
            <p className="text-slate-400 text-xs mt-1">Overall score</p>
          </Glass>
        </motion.div>

        {/* Recent Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2"
        >
          <Glass className="p-6 h-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-white">Recent Sessions</h3>
              <Link to="/sessions" className="text-xs text-slate-300 hover:text-brand-200 flex items-center gap-1 transition-colors">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {!stats?.recentSessions?.length ? (
              <div className="text-center py-10">
                <ClipboardList className="w-10 h-10 text-white/15 mx-auto mb-3" />
                <p className="text-slate-300">No sessions yet</p>
                <Link to="/interviews/new"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-xl
                             bg-gradient-to-r from-brand-600 to-violet-500 text-white text-sm font-semibold
                             shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]
                             transition-all">
                  Start practicing <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.recentSessions.map((session) => (
                  <Link
                    key={session._id}
                    to={`/sessions/${session._id}/results`}
                    className="flex items-center justify-between p-4 rounded-xl
                               bg-white/[0.02] hover:bg-white/[0.06]
                               border border-white/[0.08] hover:border-brand-400/40
                               transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-500/15 rounded-lg">
                        <Building2 className="w-4 h-4 text-brand-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{session.interviewId?.jobTitle}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {new Date(session.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        session.overallScore >= 70
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25'
                          : session.overallScore >= 40
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/25'
                          : 'bg-red-500/15 text-red-300 border-red-500/25'
                      }`}>
                        {session.overallScore}%
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-brand-300 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Glass>
        </motion.div>
      </div>

      {/* ── Quick Actions ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Glass className="p-6">
          <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { to: '/interviews/new', icon: Plus, label: 'Create Interview', desc: 'Set up a new mock session', gradient: 'from-brand-500 to-violet-500' },
              { to: '/resumes', icon: ClipboardList, label: 'Upload Resume', desc: 'Add your latest resume', gradient: 'from-violet-500 to-purple-600' },
              { to: '/sessions', icon: TrendingUp, label: 'View Progress', desc: 'Review past performance', gradient: 'from-blue-500 to-brand-600' },
            ].map(({ to, icon: Icon, label, desc, gradient }) => (
              <Link key={to} to={to}
                className="flex items-center gap-4 p-4 rounded-xl
                           bg-white/[0.02] border border-white/[0.05]
                           hover:border-brand-400/40 hover:bg-white/[0.06]
                           transition-all duration-300 group"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} flex-shrink-0 shadow-lg
                                group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]
                                transition-all duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </Glass>
      </motion.div>
    </div>
  );
}
