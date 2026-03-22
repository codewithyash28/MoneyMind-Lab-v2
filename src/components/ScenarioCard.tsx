'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scenario, Choice } from '@/data/scenarios';
import { CreditCard, ShoppingBag, AlertTriangle, CheckCircle, XCircle, ChevronRight, Award } from 'lucide-react';

const iconMap: any = {
  CreditCard: <CreditCard className="text-blue-600" size={32} />,
  ShoppingBag: <ShoppingBag className="text-purple-600" size={32} />,
  AlertTriangle: <AlertTriangle className="text-orange-600" size={32} />,
};

interface ScenarioCardProps {
  scenario: Scenario;
  onComplete: (xp: number) => void;
}

export default function ScenarioCard({ scenario, onComplete }: ScenarioCardProps) {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);

  const handleChoice = (choice: Choice) => {
    setSelectedChoice(choice);
    setShowOutcome(true);
    onComplete(choice.xpAwarded);
  };

  const reset = () => {
    setSelectedChoice(null);
    setShowOutcome(false);
  };

  return (
    <motion.div
      layout
      className="p-8 bg-white dark:bg-gray-800 rounded-3xl border-2 border-indigo-50 dark:border-gray-700 shadow-xl overflow-hidden"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl">
          {iconMap[scenario.icon]}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{scenario.title}</h3>
      </div>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        {scenario.description}
      </p>

      <AnimatePresence mode="wait">
        {!showOutcome ? (
          <motion.div
            key="choices"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {scenario.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                className="group w-full p-6 text-left border-2 border-gray-100 dark:border-gray-700 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all flex items-center justify-between"
              >
                <span className="font-semibold text-gray-800 dark:text-gray-200">{choice.text}</span>
                <ChevronRight className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="outcome"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl border-2 flex flex-col items-center text-center space-y-4 transition-colors"
            style={{
              borderColor: selectedChoice?.isCorrect ? '#10B981' : '#EF4444',
              backgroundColor: selectedChoice?.isCorrect ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
            }}
          >
            <div className={`p-3 rounded-full ${selectedChoice?.isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
              {selectedChoice?.isCorrect ? <CheckCircle size={32} /> : <XCircle size={32} />}
            </div>

            <h4 className={`text-xl font-bold ${selectedChoice?.isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
              {selectedChoice?.isCorrect ? 'Correct Decision!' : 'Not Quite Right'}
            </h4>

            <p className="text-gray-700 dark:text-gray-300 font-medium">
              {selectedChoice?.explanation}
            </p>

            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-full text-indigo-700 dark:text-indigo-300 font-bold">
              <Award size={18} />
              <span>+{selectedChoice?.xpAwarded} XP Earned</span>
            </div>

            <button
              onClick={reset}
              className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
