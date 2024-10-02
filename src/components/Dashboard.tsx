'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CopilotSidebar } from '@copilotkit/react-ui';
import { Pie } from 'react-chartjs-2';
import { v4 as uuidv4 } from 'uuid';
import '@copilotkit/react-ui/styles.css';
import '@/types/chartjs';
import { useFinance, FinanceProvider, Transaction } from '@/utils/FinanceContext';

import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

const FinanceTrackerDashboard: React.FC = () => {
  const {
    state: {
      transactions,
      name,
      totalIncome,
      savingTip,
    },
    dispatch,
  } = useFinance();

  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const apiUrl = 'https://swapnance-server.onrender.com';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Assume the user's ID is stored in localStorage (for example purposes)
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          const userResponse = await axios.get(`${apiUrl}/users/${storedUserId}`);
          dispatch({ type: 'SET_NAME', payload: userResponse.data.name });
          dispatch({ type: 'SET_TOTAL_INCOME', payload: userResponse.data.totalIncome });

          const transactionsResponse = await axios.get(`${apiUrl}/transactions/${storedUserId}`);
          transactionsResponse.data.forEach((t: Transaction) => {
            dispatch({ type: 'ADD_TRANSACTION', payload: t });
          });
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);


  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount === '' || category === '') return;

    try {
      const storedUserId = localStorage.getItem('userId');
      if (!storedUserId) {
        alert('User ID not found, please add user details first.');
        return;
      }

      const newTransaction: Transaction = {
        id: uuidv4(),
        type,
        category,
        amount: Number(amount),
        date: new Date().toISOString(),
      };


      await axios.post(`${apiUrl}/transactions/add`, {
        userId: storedUserId,
        ...newTransaction,
      });


      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
      setCategory('');
      setAmount('');
    } catch (error) {
      console.error('Error adding transaction', error);
    }
  };

  const handleAddOrUpdateUser = async () => {
    try {
      const response = await axios.post(`${apiUrl}/users/add`, {
        name,
        totalIncome: totalIncome,
      });

      const userId = response.data.user._id;
      localStorage.setItem('userId', userId); 
    } catch (error) {
      console.error('Error adding/updating user', error);
    }
  };


  const expenseData = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = {
    labels: Object.keys(expenseData),
    datasets: [
      {
        data: Object.values(expenseData),
        backgroundColor: ['#f87171', '#fb923c', '#fbbf24', '#34d399', '#60a5fa'],
        hoverOffset: 10,
      },
    ],
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <FinanceProvider>
      <motion.div
        className="w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-tr from-blue-200 to-blue-50 text-gray-900 relative"
      >
  
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>


        <motion.div
          className="text-center mb-4 mt-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-extrabold mb-2 text-blue-800">
            Finance Tracker Dashboard
          </h1>
          <p className="text-md text-blue-700">
            Track your expenses and manage your financial health.
          </p>
        </motion.div>

    
        <button
          onClick={scrollToBottom}
          className="fixed bottom-4 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition z-50"
          style={{ right: '50%', transform: 'translateX(50%)' }}
          aria-label="Scroll to bottom"
        >
          ↓
        </button>

 
        <div className="flex flex-col md:flex-row w-full max-w-5xl justify-between gap-4 mb-4 px-4">
  
          <motion.form
            className="bg-white p-4 rounded-lg shadow-md border border-gray-300 w-full md:w-1/2"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddOrUpdateUser();
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-lg font-semibold mb-3">User Details</h2>
            <div className="mb-2">
              <label className="block font-semibold mb-1">User Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
                className="p-2 border w-full rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Total Income (₹):</label>
              <input
                type="number"
                value={totalIncome}
                onChange={(e) =>
                  dispatch({ type: 'SET_TOTAL_INCOME', payload: Number(e.target.value) })
                }
                className="p-2 border w-full rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-full px-3 py-1 hover:bg-blue-700 transition"
            >
              Save User Details
            </button>
          </motion.form>

       
          <motion.form
            className="bg-white p-4 rounded-lg shadow-md border border-gray-300 w-full md:w-1/2"
            onSubmit={handleAddTransaction}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-lg font-semibold mb-3">Add Transaction</h2>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Type:</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'income' | 'expense')}
                className="p-2 border w-full rounded"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 border w-full rounded"
              >
                <option value="">Select Category</option>
                {type === 'income' ? (
                  <>
                    <option value="Salary">Salary</option>
                    <option value="Investments">Investments</option>
                  </>
                ) : (
                  <>
                    <option value="Rent">Rent</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                  </>
                )}
              </select>
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Amount (₹):</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="p-2 border w-full rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-full px-3 py-1 hover:bg-blue-700 transition"
            >
              Add Transaction
            </button>
          </motion.form>
        </div>

 
        <div className="grid md:grid-cols-2 gap-4 w-full max-w-5xl px-4 mb-8">
          <motion.div
            className="bg-white p-4 rounded-lg shadow-md border border-gray-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-lg font-semibold mb-2">Expense Breakdown</h2>
            <Pie data={pieData} />
          </motion.div>

          <motion.div
            className="bg-white p-4 rounded-lg shadow-md border border-gray-300 overflow-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-lg font-semibold mb-2">Transaction List</h2>
            <ul className="max-h-60 overflow-y-auto">
              {transactions.map((transaction) => (
                <li key={transaction.id} className="flex justify-between mb-1 p-1 border-b">
                  <div>
                    {transaction.type === 'income' ? 'Income' : 'Expense'} -{' '}
                    {transaction.category} - ₹ {transaction.amount}
                  </div>
                  <div>{new Date(transaction.date).toLocaleDateString()}</div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

   
        {savingTip && (
          <div className="fixed bottom-4 left-4 bg-white bg-opacity-90 p-4 rounded-lg shadow-md border border-gray-300 max-w-sm">
            <h3 className="text-md font-semibold mb-2">Saving Tip</h3>
            <p className="text-sm">{savingTip}</p>
          </div>
        )}

       
        <CopilotSidebar
          labels={{
            title: 'Your Finance Assistant',
            initial: 'Please click generate to get a financial tip !!!',
          }}
          instructions={`You are a financial assistant helping users manage their finances.

Based on the user's income and expenses, generate tips on how they can save money for the remaining days of the month.

Use the "generateSavingTip" action to provide a saving tip.`}
          defaultOpen={false}
          shortcut="/"
        />
      </motion.div>
    </FinanceProvider>
  );
};

export default FinanceTrackerDashboard;
