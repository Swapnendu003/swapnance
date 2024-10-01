// app/make-investment-planner/investment-plans-display.tsx

'use client';

import React, { useState } from 'react';
import { useInvestment } from './investment-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react'; // Icons for delete and expand/collapse

const InvestmentPlansDisplay: React.FC = () => {
  const { investmentPlans, deleteInvestmentPlan } = useInvestment();
  const [expandedPlanId, setExpandedPlanId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedPlanId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="w-full max-w-4xl">
      {investmentPlans.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-blue-100 to-blue-50 shadow-xl rounded-3xl p-8 relative"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
            Your Investment Plans
          </h2>
          <ul className="space-y-4">
            <AnimatePresence>
              {investmentPlans.map((plan) => (
                <motion.li
                  key={plan.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col bg-white shadow-md rounded-xl p-5 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-medium text-gray-800">
                        {plan.category}: {plan.percentage}%
                      </span>
                      <button
                        onClick={() => toggleExpand(plan.id)}
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-200 focus:outline-none"
                        aria-label={expandedPlanId === plan.id ? 'Collapse details' : 'Expand details'}
                      >
                        {expandedPlanId === plan.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                    <button
                      onClick={() => deleteInvestmentPlan(plan.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      aria-label={`Delete investment plan: ${plan.category} (${plan.percentage}%)`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <AnimatePresence>
                    {expandedPlanId === plan.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 text-gray-700 text-sm"
                      >
                        {plan.details}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default InvestmentPlansDisplay;
