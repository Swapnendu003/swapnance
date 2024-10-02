'use client'
import React, { useState } from 'react';
import { useFinance } from '@/utils/FinanceContext';
import { v4 as uuidv4 } from 'uuid';

const AddTransaction: React.FC = () => {
  const { dispatch } = useFinance();
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount === '' || category === '') return;

    const newTransaction = {
      id: uuidv4(),
      type,
      category,
      amount: Number(amount),
      date: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    setCategory('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
      <div className="mb-4">
        <label className="block mb-2">Type</label>
        <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')} className="w-full p-2 border">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Category</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Amount</label>
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full p-2 border" />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Transaction</button>
    </form>
  );
};

export default AddTransaction;
