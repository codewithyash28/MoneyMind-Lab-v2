'use client';

import ChatInterface from '@/components/ChatInterface';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Mic, Sparkles } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="flex items-center gap-3">
             <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
               <Sparkles size={28} />
             </div>
             <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">AI Money Chat</h1>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl border-2 border-indigo-50 dark:border-gray-700 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Chat with Your Assistant</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                <MessageSquare className="text-indigo-600 dark:text-indigo-400 shrink-0" size={24} />
                <p className="text-sm text-gray-700 dark:text-gray-300">Ask questions about budgeting, debt, credit scores, and scams.</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                <Mic className="text-emerald-600 dark:text-emerald-400 shrink-0" size={24} />
                <p className="text-sm text-gray-700 dark:text-gray-300">Try our voice chat feature! Click the microphone to speak.</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800">
                <Bot className="text-amber-600 dark:text-amber-400 shrink-0" size={24} />
                <p className="text-sm text-gray-700 dark:text-gray-300">Get simple, friendly, and non-advisory explanations for your money questions.</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-indigo-600 rounded-3xl text-white shadow-xl">
             <h4 className="font-bold text-lg mb-2">Pro Tip:</h4>
             <p className="text-indigo-100 text-sm">You earn 10 XP for every chat session! 🚀 Keep learning to unlock new badges.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2"
        >
          <ChatInterface />
        </motion.div>
      </div>
    </div>
  );
}
