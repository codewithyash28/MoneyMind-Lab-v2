'use client';

import { useState } from 'react';
import BudgetBuilder from '@/components/BudgetBuilder';
import DebtVisualizer from '@/components/DebtVisualizer';
import ReflectionModal from '@/components/ReflectionModal';
import { useUser } from '@/lib/UserContext';
import { motion } from 'framer-motion';
import { Gamepad2, Info } from 'lucide-react';

export default function GamesPage() {
  const [showReflection, setShowReflection] = useState(false);
  const [reflectionTitle, setReflectionTitle] = useState('');
  const [reflectionXp, setReflectionXp] = useState(0);
  const { refetch } = useUser();

  const handleGameComplete = async (title: string, xp: number) => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleType: 'game', moduleId: title.toLowerCase().replace(' ', '-'), xp }),
      });
      if (response.ok) {
        setReflectionTitle(title);
        setReflectionXp(xp);
        setShowReflection(true);
        await refetch();
      }
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="flex items-center gap-6 mb-12">
          <div className="p-4 bg-emerald-600 rounded-2xl text-white shadow-lg">
            <Gamepad2 size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Mini-Games</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Practice your financial skills in a fun, risk-free environment.</p>
          </div>
        </header>

        <section className="space-y-8">
          <BudgetBuilder onComplete={(xp) => handleGameComplete('Budget Builder', xp)} />
          <DebtVisualizer onComplete={(xp) => handleGameComplete('Debt Visualizer', xp)} />
        </section>

        <ReflectionModal
          isOpen={showReflection}
          onClose={() => setShowReflection(false)}
          title={reflectionTitle}
          xpAwarded={reflectionXp}
          learningPoints={[
            "Financial literacy is a journey, and every step counts towards your goals.",
            "Visualizing how debt grows vs savings grow helps in making better decisions.",
            "A balanced budget is the first step towards financial freedom."
          ]}
        />

        <footer className="p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-start gap-4">
          <Info className="text-gray-400 shrink-0" size={24} />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            These games are designed to teach you basic concepts. Real-life financial situations can be more complex and may involve additional fees or variables.
          </p>
        </footer>
      </div>
    </div>
  );
}
