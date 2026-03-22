'use client';

import { useUser } from '@/lib/UserContext';
import { motion } from 'framer-motion';
import { User, MapPin, Target, Calendar, Award, Star, TrendingUp, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useUser();

  const badges = [
    { id: 1, name: 'Budget Master', icon: Star, color: 'text-amber-500', minXp: 50 },
    { id: 2, name: 'Debt Crusher', icon: TrendingUp, color: 'text-emerald-500', minXp: 150 },
    { id: 3, name: 'Scam Shield', icon: Shield, color: 'text-indigo-500', minXp: 300 },
  ];

  return (
    <div className="min-h-screen bg-indigo-50 dark:bg-gray-950 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center gap-6 mb-12">
           <div className="relative">
              <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-3xl border-4 border-indigo-600 shadow-2xl flex items-center justify-center text-indigo-600">
                <User size={48} />
              </div>
              <div className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 rounded-xl text-white shadow-lg border-2 border-white dark:border-gray-950">
                <Award size={20} />
              </div>
           </div>
           <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Your Profile</h1>
              <p className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest">{user?.xp || 0} Total XP</p>
           </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="p-8 bg-white dark:bg-gray-800 rounded-3xl border-2 border-indigo-50 dark:border-gray-700 shadow-xl space-y-6">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Account Details</h2>

             <div className="flex items-center gap-4">
               <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl text-gray-400">
                  <MapPin size={24} />
               </div>
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Country</p>
                  <p className="font-bold text-gray-900 dark:text-white">{user?.country || 'Not set'}</p>
               </div>
             </div>

             <div className="flex items-center gap-4">
               <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl text-gray-400">
                  <Calendar size={24} />
               </div>
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Age Range</p>
                  <p className="font-bold text-gray-900 dark:text-white">{user?.ageRange || 'Not set'}</p>
               </div>
             </div>

             <div className="flex items-center gap-4">
               <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl text-gray-400">
                  <Target size={24} />
               </div>
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Goal</p>
                  <p className="font-bold text-gray-900 dark:text-white">{user?.goal || 'Not set'}</p>
               </div>
             </div>
          </section>

          <section className="p-8 bg-white dark:bg-gray-800 rounded-3xl border-2 border-indigo-50 dark:border-gray-700 shadow-xl">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Achievement Badges</h2>
             <div className="grid grid-cols-2 gap-4">
                {badges.map(badge => {
                  const isLocked = (user?.xp || 0) < badge.minXp;
                  return (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${isLocked ? 'border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50 opacity-40 grayscale' : 'border-indigo-100 bg-indigo-50 dark:border-indigo-900/20 shadow-sm'}`}
                    >
                       <badge.icon className={`${badge.color} mb-2`} size={32} />
                       <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">{badge.name}</p>
                       {isLocked && <p className="text-[10px] text-gray-400 mt-1 font-bold">LOCKED ({badge.minXp} XP)</p>}
                    </div>
                  );
                })}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
