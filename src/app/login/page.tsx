'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogIn, ArrowRight, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/chat');
      } else {
        const data = await response.json();
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 dark:bg-gray-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-3xl border-2 border-indigo-100 dark:border-gray-700 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="p-2 bg-indigo-600 rounded-xl text-white">
            <LogIn size={24} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none">Welcome Back</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-3 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Logging In...' : 'Log In'}
            <ArrowRight size={24} />
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 font-medium">
          Don't have an account? <button onClick={() => router.push('/register')} className="text-indigo-600 font-bold hover:underline">Sign Up</button>
        </p>
      </motion.div>
    </div>
  );
}
