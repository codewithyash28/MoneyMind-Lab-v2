'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, BookOpen, Star } from 'lucide-react';

interface ReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  learningPoints: string[];
  xpAwarded: number;
}

export default function ReflectionModal({ isOpen, onClose, title, learningPoints, xpAwarded }: ReflectionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-100 dark:bg-indigo-900/30 rounded-full blur-3xl" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>

            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                  <CheckCircle size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">Awesome Work!</h3>
                  <p className="text-gray-500 font-medium">You've completed: {title}</p>
                </div>
              </div>

              <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border-2 border-indigo-100 dark:border-indigo-800 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="text-indigo-600 dark:text-indigo-400" size={20} />
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-100 uppercase tracking-wider text-xs">What you learned:</h4>
                </div>
                <ul className="space-y-3">
                  {learningPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2 px-6 py-3 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-2xl font-black shadow-sm">
                   <Star size={24} />
                   <span className="text-xl">+{xpAwarded} XP</span>
                 </div>

                 <button
                   onClick={onClose}
                   className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                 >
                   Continue Learning
                 </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
