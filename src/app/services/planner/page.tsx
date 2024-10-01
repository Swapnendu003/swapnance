"use client";

import React from "react";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { InvestmentProvider } from "../../../components/investment-context";
import InvestmentPlansDisplay from "../../../components/investment-plans-display";
import InvestmentPieChart from "@/components/InvestmentPieChart";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import "@copilotkit/react-ui/styles.css";
import "@/types/chartjs";

const MakeInvestmentPlanner: React.FC = () => {
  return (
    <InvestmentProvider>
      <div className="w-full min-h-screen flex flex-col items-center justify-start py-20 px-6 md:px-20 bg-gradient-to-tr from-blue-200 to-blue-50 text-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
       
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>

        <motion.div
          className="flex flex-col items-center mb-16 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <DollarSign size={64} className="text-blue-600 mb-4 animate-pulse" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center text-blue-800">
            Personalized Investment Planner
          </h1>
          <p className="text-lg md:text-xl text-center text-blue-700 max-w-2xl">
            Leverage the power of AI to create tailored investment strategies
            that align with your financial goals and risk tolerance.
          </p>
        </motion.div>

        <InvestmentPieChart />


        <InvestmentPlansDisplay />

        <CopilotSidebar
          labels={{
            title: "Your Investment Assistant",
            initial:
              "Please provide your age and monthly income to get your personalized investment plan.",
          }}
          instructions={`You are a financial advisor helping users create personalized investment plans.

Based on the user's age and monthly income, generate appropriate investment recommendations with categories and their corresponding percentages and detailed descriptions.

Use the "addInvestmentPlan" action to add each investment plan by providing the "category", "percentage", and "details" parameters.`}
          defaultOpen={false}
          shortcut="/" 
        >
     
        </CopilotSidebar>
      </div>
    </InvestmentProvider>
  );
};

export default MakeInvestmentPlanner;
