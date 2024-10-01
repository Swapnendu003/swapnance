// app/make-investment-planner/investment-context.tsx

'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';
import { InvestmentPlan } from '@/types/investment';

type InvestmentContextType = {
  investmentPlans: InvestmentPlan[];
  addInvestmentPlan: (category: string, percentage: number, details: string) => void;
  deleteInvestmentPlan: (id: number) => void;
};

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

export const InvestmentProvider = ({ children }: { children: ReactNode }) => {
  const [investmentPlans, setInvestmentPlans] = useState<InvestmentPlan[]>([]);

  // Make the investment plans readable by Copilot
  useCopilotReadable({
    description: 'The current list of investment plans',
    value: JSON.stringify(investmentPlans),
  });

  // Function to add a new investment plan
  const addInvestmentPlan = (category: string, percentage: number, details: string) => {
    const newPlan: InvestmentPlan = {
      id: investmentPlans.length + 1,
      category,
      percentage,
      details,
    };
    setInvestmentPlans((prevPlans) => [...prevPlans, newPlan]);
    console.log(`Added Investment Plan: ${category} (${percentage}%) - ${details}`); // Debug log
  };

  // Function to delete an investment plan by ID
  const deleteInvestmentPlan = (id: number) => {
    setInvestmentPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
    console.log(`Deleted Investment Plan with ID: ${id}`); // Debug log
  };

  // Define the custom action to add an investment plan
  useCopilotAction({
    name: 'addInvestmentPlan',
    description: 'Add a new investment plan to the list.',
    parameters: [
      {
        name: 'category',
        type: 'string',
        description: 'Category of the investment plan.',
        required: true,
      },
      {
        name: 'percentage',
        type: 'number',
        description: 'Percentage allocation for the investment plan.',
        required: true,
      },
      {
        name: 'details',
        type: 'string',
        description: 'Detailed description of the investment plan.',
        required: true,
      },
    ],
    handler: async ({ category, percentage, details }: { category: string; percentage: number; details: string }) => {
      console.log(`Copilot Action Invoked: addInvestmentPlan with category: ${category}, percentage: ${percentage}%, details: ${details}`); // Debug log
      addInvestmentPlan(category, percentage, details);
      return 'Investment plan added successfully!';
    },
  });

  // Define the custom action to delete an investment plan
  useCopilotAction({
    name: 'deleteInvestmentPlan',
    description: 'Delete an investment plan from the list by ID.',
    parameters: [
      {
        name: 'id',
        type: 'number',
        description: 'The ID of the investment plan to delete.',
        required: true,
      },
    ],
    handler: async ({ id }: { id: number }) => {
      console.log(`Copilot Action Invoked: deleteInvestmentPlan with ID: ${id}`); // Debug log
      deleteInvestmentPlan(id);
      return 'Investment plan deleted successfully!';
    },
  });

  return (
    <InvestmentContext.Provider value={{ investmentPlans, addInvestmentPlan, deleteInvestmentPlan }}>
      {children}
    </InvestmentContext.Provider>
  );
};

export const useInvestment = () => {
  const context = useContext(InvestmentContext);
  if (context === undefined) {
    throw new Error('useInvestment must be used within an InvestmentProvider');
  }
  return context;
};
