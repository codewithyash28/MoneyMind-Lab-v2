'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Gamepad2, MessageCircle } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-indigo-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-0 -right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-white dark:bg-gray-900 border-2 border-indigo-100 dark:border-gray-800 rounded-full mb-8 shadow-sm">
          <Sparkles className="text-indigo-600" size={20} />
          <span className="text-sm font-black text-indigo-900 dark:text-indigo-100 uppercase tracking-widest">Master Your Money</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter leading-none">
          MoneyMind <span className="text-indigo-600">Lab.</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          The ultimate playground for young adults to learn financial literacy without the real-world risk.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl border-2 border-indigo-50 dark:border-gray-700 shadow-xl flex flex-col items-center">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 rounded-2xl mb-4">
                 <MessageCircle size={28} />
              </div>
              <p className="font-bold text-gray-900 dark:text-white">AI Money Chat</p>
           </div>
           <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl border-2 border-indigo-50 dark:border-gray-700 shadow-xl flex flex-col items-center">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 rounded-2xl mb-4">
                 <ShieldCheck size={28} />
              </div>
              <p className="font-bold text-gray-900 dark:text-white">Scenario Sims</p>
           </div>
           <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl border-2 border-indigo-50 dark:border-gray-700 shadow-xl flex flex-col items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/40 text-purple-600 rounded-2xl mb-4">
                 <Gamepad2 size={28} />
              </div>
              <p className="font-bold text-gray-900 dark:text-white">Mini-Games</p>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/register')}
            className="group px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/40 flex items-center justify-center gap-3 active:scale-95"
          >
            Get Started
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => router.push('/login')}
            className="px-10 py-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-gray-800 rounded-2xl font-black text-xl hover:shadow-xl transition-all active:scale-95"
          >
            Log In
          </button>
        </div>
      </motion.div>
    </div>
  );
}
