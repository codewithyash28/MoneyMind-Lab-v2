'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/lib/UserContext';
import { TrendingDown, TrendingUp, Info, Award } from 'lucide-react';

interface DebtVisualizerProps {
  onComplete: (xp: number) => void;
}

export default function DebtVisualizer({ onComplete }: DebtVisualizerProps) {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(15);
  const [time, setTime] = useState(5);
  const [hasAwarded, setHasAwarded] = useState(false);
  const { user } = useUser();

  const data = useMemo(() => {
    const savings = amount * Math.pow(1 + 0.05 / 1, 1 * time); // 5% savings rate
    const debt = amount * Math.pow(1 + (rate / 100) / 1, 1 * time);
    return { savings: Math.round(savings), debt: Math.round(debt) };
  }, [amount, rate, time]);

  const handleAward = () => {
    if (!hasAwarded) {
      setHasAwarded(true);
      onComplete(20);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-white dark:bg-gray-800 rounded-3xl border-2 border-indigo-50 dark:border-gray-700 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-600 rounded-xl text-white">
          <TrendingUp size={24} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Debt vs. Savings Visualizer</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block font-bold text-gray-700 dark:text-gray-300">Initial Amount: {user?.currencySymbol}{amount}</label>
            <input
              type="range" min="100" max="5000" step="100" value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-bold text-gray-700 dark:text-gray-300">Interest Rate (Debt): {rate}%</label>
            <input
              type="range" min="5" max="35" step="1" value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-bold text-gray-700 dark:text-gray-300">Time (Years): {time}</label>
            <input
              type="range" min="1" max="20" step="1" value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 text-sm flex gap-3">
             <Info className="text-indigo-600 dark:text-indigo-400 shrink-0" size={20} />
             <p className="text-gray-600 dark:text-gray-400">This visualization uses simple compound interest. Debt typically has much higher rates than savings accounts.</p>
          </div>

          {!hasAwarded && (
            <button
              onClick={handleAward}
              className="w-full p-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Award size={20} />
              I Understand This Concept (+20 XP)
            </button>
          )}
        </div>

        <div className="flex flex-col justify-center space-y-8">
           <div className="relative p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border-2 border-red-100 dark:border-red-800 overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 text-red-100 dark:text-red-800/20 group-hover:scale-110 transition-transform">
                <TrendingDown size={120} />
              </div>
              <div className="relative">
                <p className="text-sm text-red-600 font-bold uppercase tracking-wider mb-1">Debt Growth</p>
                <p className="text-5xl font-black text-red-600 tracking-tighter">{user?.currencySymbol}{data.debt}</p>
                <p className="text-sm text-red-700 dark:text-red-400 mt-2 font-medium">Interest eats your money!</p>
              </div>
           </div>

           <div className="relative p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border-2 border-emerald-100 dark:border-emerald-800 overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 text-emerald-100 dark:text-emerald-800/20 group-hover:scale-110 transition-transform">
                <TrendingUp size={120} />
              </div>
              <div className="relative">
                <p className="text-sm text-emerald-600 font-bold uppercase tracking-wider mb-1">Savings Growth (at 5%)</p>
                <p className="text-5xl font-black text-emerald-600 tracking-tighter">{user?.currencySymbol}{data.savings}</p>
                <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-2 font-medium">Interest builds your wealth!</p>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
