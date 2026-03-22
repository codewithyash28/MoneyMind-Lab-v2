'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/lib/UserContext';

const steps = [
  { id: 'country', label: 'Where are you from?' },
  { id: 'age', label: 'What is your age range?' },
  { id: 'goal', label: 'What is your main goal?' },
];

const countries = ['USA', 'UK', 'India', 'Germany', 'France', 'Japan', 'Canada', 'Australia', 'Nigeria', 'Kenya', 'South Africa', 'Brazil', 'Mexico', 'Other'];
const ageRanges = ['15-18', '19-21', '22-24'];
const goals = ['Learn Budgeting', 'Avoid Debt', 'Understand Credit', 'Avoid Scams'];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    country: '',
    ageRange: '',
    goal: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { updateProfile } = useUser();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        updateProfile(formData);
        router.push('/chat');
      } else {
        alert('Failed to save profile. Please try again.');
      }
    } catch (error) {
      console.error('Onboarding failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
      >
        <h1 className="mb-6 text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400">Welcome to MoneyMind Lab!</h1>
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`w-1/3 h-2 rounded-full mx-1 ${index <= currentStep ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`}
              />
            ))}
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400 font-medium">{steps[currentStep].label}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {currentStep === 0 && (
              <div className="grid grid-cols-2 gap-3">
                {countries.map(country => (
                  <button
                    key={country}
                    onClick={() => setFormData({ ...formData, country })}
                    className={`p-3 text-sm rounded-lg border-2 transition-all ${formData.country === country ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-3">
                {ageRanges.map(age => (
                  <button
                    key={age}
                    onClick={() => setFormData({ ...formData, ageRange: age })}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all ${formData.ageRange === age ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}
                  >
                    {age} years old
                  </button>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-3">
                {goals.map(goal => (
                  <button
                    key={goal}
                    onClick={() => setFormData({ ...formData, goal })}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all ${formData.goal === goal ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
            className={`px-4 py-2 text-sm font-medium ${currentStep === 0 ? 'opacity-0' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Back
          </button>
          <button
            disabled={
              (currentStep === 0 && !formData.country) ||
              (currentStep === 1 && !formData.ageRange) ||
              (currentStep === 2 && !formData.goal) ||
              isSubmitting
            }
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
          >
            {currentStep === steps.length - 1 ? (isSubmitting ? 'Saving...' : 'Finish') : 'Next'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
