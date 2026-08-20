import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';
import Iridescence from '../components/Iridescence';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a14] flex">
      {/* ── Left Brand Panel — Iridescence background ──────── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden">
        {/* Full iridescence background */}
        <div className="absolute inset-0 z-0">
          <Iridescence
            color={[0.792156862745098, 0.14901960784313725, 0.3137254901960784]}
            mouseReact
            amplitude={0.1}
            speed={1}
          />
        </div>
        {/* Soft overlay for readability */}
        <div className="absolute inset-0 z-[1] bg-black/30" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20
                            shadow-[0_0_20px_rgba(244,63,94,0.3)]">
              <BrainCircuit className="w-10 h-10 text-white" />
            </div>
            <span className="text-3xl font-display font-bold text-white">
              Interview<span className="text-rose-300">AI</span>
            </span>
          </div>

          <h1 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
            Ace your next<br />
            <span className="bg-gradient-to-r from-rose-300 to-fuchsia-300 bg-clip-text text-transparent">
              interview
            </span> with AI
          </h1>
          <p className="text-white/60 text-lg max-w-sm leading-relaxed">
            Upload your resume, input the job description, and get personalized interview questions powered by advanced AI.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { label: 'Questions Generated', value: '50K+' },
              { label: 'Mock Interviews', value: '12K+' },
              { label: 'Success Rate', value: '87%' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-white/40 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right Form Panel ──────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <BrainCircuit className="w-7 h-7 text-rose-400" />
            <span className="text-xl font-display font-bold gradient-text">InterviewAI</span>
          </div>

          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
