'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScenarioCard from '@/components/ScenarioCard';
import ReflectionModal from '@/components/ReflectionModal';
import { scenarios } from '@/data/scenarios';
import { useUser } from '@/lib/UserContext';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';

export default function ScenariosPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReflection, setShowReflection] = useState(false);
  const [currentXp, setCurrentXp] = useState(0);
  const { refetch, user } = useUser();

  const handleComplete = async (xp: number) => {
    try {
      setCurrentXp(xp);
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleType: 'scenario',
          moduleId: scenarios[currentIndex].id,
          xp
        }),
      });
      if (response.ok) {
        setShowReflection(true);
        await refetch();
      }
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const nextScenario = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevScenario = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 dark:bg-gray-950 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-4 md:space-y-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg">
              <Sparkles size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none">Scenario Simulator</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Test your money skills in real-life situations.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border-2 border-indigo-100 dark:border-gray-700">
             <div className="text-right">
                <span className="block text-xs text-gray-400 font-bold uppercase tracking-wider">Current Score</span>
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{user?.xp || 0} XP</span>
             </div>
          </div>
        </header>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={scenarios[currentIndex].id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            >
              <ScenarioCard
                scenario={scenarios[currentIndex]}
                onComplete={handleComplete}
              />
            </motion.div>
          </AnimatePresence>

          <ReflectionModal
            isOpen={showReflection}
            onClose={() => setShowReflection(false)}
            title={scenarios[currentIndex].title}
            xpAwarded={currentXp}
            learningPoints={[
              "Making small, informed decisions now builds a strong foundation for your financial future.",
              "Always think twice before sharing your personal info.",
              "Paying in full saves you money on interest."
            ]}
          />

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevScenario}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 p-3 px-6 rounded-2xl font-bold transition-all ${currentIndex === 0 ? 'opacity-0' : 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:shadow-md'}`}
            >
              <ArrowLeft size={20} />
              Previous
            </button>
            <div className="flex gap-2">
              {scenarios.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-indigo-600 w-8' : 'bg-indigo-200 dark:bg-gray-800'}`}
                />
              ))}
            </div>
            <button
              onClick={nextScenario}
              disabled={currentIndex === scenarios.length - 1}
              className={`flex items-center gap-2 p-3 px-6 rounded-2xl font-bold transition-all ${currentIndex === scenarios.length - 1 ? 'opacity-0' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20'}`}
            >
              Next
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
