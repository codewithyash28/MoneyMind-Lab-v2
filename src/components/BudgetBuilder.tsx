'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, CheckCircle, Info, Sparkles, AlertCircle } from 'lucide-react';
import { useUser } from '@/lib/UserContext';

interface Expense {
  id: string;
  name: string;
  amount: number;
  category: 'needs' | 'wants';
  selected: boolean;
}

interface BudgetBuilderProps {
  onComplete: (xp: number) => void;
}

const initialExpenses: Expense[] = [
  { id: '1', name: 'Rent/Dorm', amount: 800, category: 'needs', selected: true },
  { id: '2', name: 'Groceries', amount: 300, category: 'needs', selected: true },
  { id: '3', name: 'Phone Plan', amount: 50, category: 'needs', selected: true },
  { id: '4', name: 'Streaming Services', amount: 30, category: 'wants', selected: false },
  { id: '5', name: 'Dining Out', amount: 200, category: 'wants', selected: false },
  { id: '6', name: 'Gym Membership', amount: 40, category: 'wants', selected: false },
  { id: '7', name: 'Internet', amount: 60, category: 'needs', selected: true },
  { id: '8', name: 'Gaming/Hobbies', amount: 100, category: 'wants', selected: false },
  { id: '9', name: 'Savings/Emergency', amount: 150, category: 'needs', selected: false },
];

export default function BudgetBuilder({ onComplete }: BudgetBuilderProps) {
  const [income] = useState(1500);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [isBalanced, setIsBalanced] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const total = expenses.filter(e => e.selected).reduce((acc, curr) => acc + curr.amount, 0);
    setTotalExpenses(total);
    setIsBalanced(total <= income && total > 0);

    if (total <= income && total > 0 && !hasCompleted) {
      setHasCompleted(true);
      onComplete(50);
    }
  }, [expenses, income, hasCompleted, onComplete]);

  const toggleExpense = (id: string) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, selected: !e.selected } : e));
  };

  const remaining = income - totalExpenses;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-white dark:bg-gray-800 rounded-3xl border-2 border-indigo-50 dark:border-gray-700 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-600 rounded-xl text-white">
          <Sparkles size={24} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Budget Builder</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border-2 border-indigo-100 dark:border-indigo-800">
            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider mb-1">Monthly Income</p>
            <p className="text-4xl font-black text-gray-900 dark:text-white">{user?.currencySymbol}{income}</p>
          </div>

          <div className={`p-6 rounded-2xl border-2 transition-colors ${remaining >= 0 ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800' : 'bg-red-50 border-red-100 dark:bg-red-900/20 dark:border-red-800'}`}>
            <p className={`text-sm font-bold uppercase tracking-wider mb-1 ${remaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>Remaining Balance</p>
            <p className={`text-4xl font-black ${remaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {user?.currencySymbol}{remaining}
            </p>
            {remaining < 0 && (
              <p className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1">
                <AlertCircle size={16} /> Over budget! Remove some wants.
              </p>
            )}
          </div>

          {isBalanced && remaining >= 0 && (
             <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="p-6 bg-emerald-600 rounded-2xl text-white flex items-center gap-4"
             >
                <CheckCircle size={32} />
                <div>
                   <p className="font-bold text-lg">Budget Balanced!</p>
                   <p className="text-emerald-100 text-sm">You've successfully allocated your income. You earn +50 XP!</p>
                </div>
             </motion.div>
          )}
        </div>

        <div className="space-y-3">
          <p className="font-bold text-gray-900 dark:text-white mb-2">Toggle Expenses:</p>
          {expenses.map(expense => (
            <button
              key={expense.id}
              onClick={() => toggleExpense(expense.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${expense.selected ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${expense.selected ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                  {expense.selected ? <Minus size={18} /> : <Plus size={18} />}
                </div>
                <div className="text-left">
                  <p className={`font-bold ${expense.selected ? 'text-indigo-900 dark:text-indigo-100' : 'text-gray-600 dark:text-gray-400'}`}>{expense.name}</p>
                  <p className="text-xs font-medium uppercase text-gray-400">{expense.category}</p>
                </div>
              </div>
              <p className={`font-black ${expense.selected ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}>{user?.currencySymbol}{expense.amount}</p>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
