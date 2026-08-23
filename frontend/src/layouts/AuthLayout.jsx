import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';
import Iridescence from '../components/Iridescence';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#090b14] flex">
      {/* ── Left Brand Panel — Iridescence background ──────── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden">
        {/* Full iridescence background */}
        <div className="absolute inset-0 z-0">
          <Iridescence
            color={[0.24705882352941178, 0.3176470588235294, 0.8313725490196079]}
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
                            shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <BrainCircuit className="w-10 h-10 text-white" />
            </div>
            <span className="text-3xl font-display font-bold text-white">
              Interview<span className="text-brand-200">AI</span>
            </span>
          </div>

          <h1 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
            Ace your next<br />
            <span className="bg-gradient-to-r from-brand-200 to-violet-200 bg-clip-text text-transparent">
              interview
            </span> with AI
          </h1>
          <p className="text-white/60 text-lg max-w-sm leading-relaxed">
            Upload your resume, input the job description, and get personalized interview questions powered by advanced AI.
          </p>

          <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/65">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Personalized practice, clear feedback, measurable progress
          </div>
        </motion.div>
      </div>

      {/* ── Right Form Panel ──────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#11162a]/75 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <BrainCircuit className="w-7 h-7 text-brand-300" />
            <span className="text-xl font-display font-bold gradient-text">InterviewAI</span>
          </div>

          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
