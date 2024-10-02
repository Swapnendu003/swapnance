'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';


export type Transaction = {
    id: string;
    type: 'income' | 'expense';
    category: string;
    amount: number;
    date: string;
  };
  


type FinanceState = {
  transactions: Transaction[];
  totalIncomeFromTransactions: number;
  totalExpenseFromTransactions: number;
  name: string;
  totalIncome: number; // User's entered total income
  savingTip: string;
};


type Action =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_TOTAL_INCOME'; payload: number }
  | { type: 'SET_SAVING_TIP'; payload: string };

const initialState: FinanceState = {
  transactions: [],
  totalIncomeFromTransactions: 0,
  totalExpenseFromTransactions: 0,
  name: '',
  totalIncome: 0,
  savingTip: '',
};

function financeReducer(state: FinanceState, action: Action): FinanceState {
  switch (action.type) {
    case 'ADD_TRANSACTION': {
      const newTransactions = [...state.transactions, action.payload];
      const income = newTransactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);
      const expense = newTransactions
        .filter((transaction) => transaction.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

      return {
        ...state,
        transactions: newTransactions,
        totalIncomeFromTransactions: income,
        totalExpenseFromTransactions: expense,
      };
    }
    case 'DELETE_TRANSACTION': {
      const filteredTransactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
      const incomeAfterDeletion = filteredTransactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);
      const expenseAfterDeletion = filteredTransactions
        .filter((transaction) => transaction.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

      return {
        ...state,
        transactions: filteredTransactions,
        totalIncomeFromTransactions: incomeAfterDeletion,
        totalExpenseFromTransactions: expenseAfterDeletion,
      };
    }
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'SET_TOTAL_INCOME':
      return {
        ...state,
        totalIncome: action.payload,
      };
    case 'SET_SAVING_TIP':
      return {
        ...state,
        savingTip: action.payload,
      };
    default:
      return state;
  }
}

const FinanceContext = createContext<{
  state: FinanceState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});


export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  useCopilotReadable({
    description: 'The current list of transactions and user info',
    value: JSON.stringify({
      name: state.name,
      totalIncome: state.totalIncome,
      transactions: state.transactions,
      totalIncomeFromTransactions: state.totalIncomeFromTransactions,
      totalExpenseFromTransactions: state.totalExpenseFromTransactions,
    }),
  });

  
  useCopilotAction({
    name: 'generateSavingTip',
    description: 'Generate a tip on how to save for the remaining days of the month.',
    parameters: [],
    handler: async () => {
      const today = new Date();
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const remainingDays = lastDayOfMonth.getDate() - today.getDate();

      const netIncome =
        state.totalIncome + state.totalIncomeFromTransactions - state.totalExpenseFromTransactions;

      const dailyBudget = netIncome / (remainingDays || 1); // Avoid division by zero

      const tip = `You have ₹${netIncome.toFixed(
        2
      )} remaining for ${remainingDays} days. That's about ₹${dailyBudget.toFixed(
        2
      )} per day. Try to limit your daily expenses to stay within this budget.`;

      dispatch({ type: 'SET_SAVING_TIP', payload: tip });

      return 'Saving tip generated successfully!';
    },
  });

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
};


export const useFinance = () => {
  return useContext(FinanceContext);
};
