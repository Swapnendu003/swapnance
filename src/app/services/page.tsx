"use client";
import React from "react";
import { motion } from "framer-motion";
import { Wallet, Briefcase, BarChart2 } from "lucide-react";
import Link from "next/link";

const OurServices: React.FC = () => {
  return (
    <div className="w-full">
      {/* Services Section */}
      <div className="w-full py-20 px-6 md:px-20 bg-gradient-to-b from-gray-100 to-blue-50 text-gray-900 flex flex-col items-center">
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
            className="text-4xl font-bold mt-4"
          >
            What We Offer
          </motion.h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
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
          {/* Card 1: Investment Planner */}
          <Link href="/services/planner">
            <motion.div
              whileHover={{ scale: 1.05, translateY: -10 }}
              className="flex flex-col items-center bg-gradient-to-b from-white to-gray-100 rounded-xl shadow-lg hover:shadow-2xl p-8 relative overflow-hidden transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="bg-blue-100 rounded-full p-6 mb-4 z-10">
                <Wallet color="#1D4ED8" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4 z-10 text-blue-900 text-center">
                Make Your Own Investment Planner
              </h3>
              <p className="text-center text-gray-600 z-10">
                Plan your investments effectively and reach your financial goals with our AI-powered planner.
              </p>
            </motion.div>
          </Link>

          {/* Card 2: Finance Tracker */}
          <Link href="/services/finance-tracker">
            <motion.div
              whileHover={{ scale: 1.05, translateY: -10 }}
              className="flex flex-col items-center bg-gradient-to-b from-green-500 to-green-400 text-white rounded-xl shadow-lg hover:shadow-2xl p-8 relative overflow-hidden transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="bg-green-800 rounded-full p-6 mb-4 z-10">
                <BarChart2 color="#FFFFFF" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4 z-10 text-center">
                Track Your Finance Effectively with Swapnance
              </h3>
              <p className="text-center z-10">
                Keep a close watch on your expenses and savings to effectively manage your financial health.
              </p>
            </motion.div>
          </Link>

          {/* Card 3: Quiz */}
          <Link href="/services/quiz">
            <motion.div
              whileHover={{ scale: 1.05, translateY: -10 }}
              className="flex flex-col items-center bg-gradient-to-b from-blue-700 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-2xl p-8 relative overflow-hidden transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="bg-blue-900 rounded-full p-6 mb-4 z-10">
                <Briefcase color="#FFFFFF" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4 z-10 text-center">
                Take a Quiz to Test Your Investment Sense
              </h3>
              <p className="text-center z-10">
                Test your investment knowledge and discover how to make smarter financial decisions.
              </p>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Footer Section */}
      <footer className="w-full py-6 bg-blue-800 text-white text-center mt-0 h-[7rem]">
        <p className="text-lg mt-5">
          Made with love <span className="text-red-500">❤️</span> by Swapnendu Banerjee
        </p>
      </footer>
    </div>
  );
};

export default OurServices;
