'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { MessageSquare, LayoutGrid, Gamepad2, User as UserIcon, LogOut, Award } from 'lucide-react';
import { useUser } from '@/lib/UserContext';

const navItems = [
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/scenarios', label: 'Scenarios', icon: LayoutGrid },
  { href: '/games', label: 'Games', icon: Gamepad2 },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (pathname === '/' || pathname === '/onboarding' || pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-2 border-indigo-100 dark:border-gray-800 rounded-3xl p-3 shadow-2xl flex items-center justify-between gap-4 px-6">
      <div className="flex items-center gap-2 mr-4">
        <Link href="/profile" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <UserIcon size={24} />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{user?.xp || 0} XP</p>
            <div className="w-20 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-1 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((user?.xp || 0) % 100, 100)}%` }}
                className="h-full bg-indigo-500 rounded-full"
              />
            </div>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-1 sm:gap-4 flex-1 justify-center">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className="relative group">
              <div className={`flex flex-col items-center gap-1 p-2 sm:px-4 rounded-2xl transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                <item.icon size={22} className={isActive ? 'scale-110 transition-transform' : ''} />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">{item.label}</span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="ml-4 pl-4 border-l-2 border-gray-100 dark:border-gray-800">
        <button
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        >
          <LogOut size={22} />
        </button>
      </div>
    </nav>
  );
}
