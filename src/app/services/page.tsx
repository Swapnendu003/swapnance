'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Briefcase, TrendingUp } from 'lucide-react'; 
import Link from 'next/link';

const OurServices: React.FC = () => {
  return (
    <div className="w-full py-20 px-6 md:px-20 bg-gradient-to-b from-gray-100 to-blue-50 text-gray-900">
      <div className="text-center mb-12">
        <motion.h4
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-blue-600 text-lg font-semibold uppercase"
        >
          Our Services
        </motion.h4>
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-4xl font-bold"
        >
          What We Offer
        </motion.h2>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            opacity: 0,
            y: 50,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.2,
              duration: 1,
            },
          },
        }}
      >

        <Link href="/services/planner">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center bg-gradient-to-b from-white to-gray-100 rounded-xl shadow-lg hover:shadow-2xl p-8 relative overflow-hidden"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="bg-blue-100 rounded-full p-6 mb-4 z-10">
       
            <Wallet color="#1D4ED8" size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-4 z-10">Make Your Investment Planner</h3>
          <p className="text-center text-gray-600 z-10">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.
          </p>
        </motion.div></Link>
       

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center bg-gradient-to-b from-blue-700 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-2xl p-8 relative overflow-hidden"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="bg-blue-900 rounded-full p-6 mb-4 z-10">
         
            <Briefcase color="#FFFFFF" size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-4 z-10">Take a Quiz to Test Your Investment Sense</h3>
          <p className="text-center z-10">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center bg-gradient-to-b from-blue-900 to-blue-800 text-white rounded-xl shadow-lg hover:shadow-2xl p-8 relative overflow-hidden"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="bg-blue-900 rounded-full p-6 mb-4 z-10">
   
            <TrendingUp color="#FFFFFF" size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-4 z-10">Make Your Finance Tracker</h3>
          <p className="text-center z-10">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OurServices;