'use client'
import React from 'react';
import { useFinance } from '@/utils/FinanceContext';

const TransactionList: React.FC = () => {
  const { state, dispatch } = useFinance();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Transaction List</h2>
      <ul>
        {state.transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between mb-2 p-2 border-b">
            <div>
              <strong>{transaction.type.toUpperCase()}: </strong> {transaction.category} - ${transaction.amount}
            </div>
            <button
              onClick={() => dispatch({ type: 'DELETE_TRANSACTION', payload: transaction.id })}
              className="text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
