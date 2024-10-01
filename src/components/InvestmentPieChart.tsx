// app/make-investment-planner/InvestmentPieChart.tsx

'use client';

import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { useInvestment } from '@/components/investment-context';
import { motion } from 'framer-motion';
import '@/types/chartjs'; // Ensure Chart.js is configured
//import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from '@/types/chartjs';

// Define the InvestmentPieChart component
const InvestmentPieChartComponent: React.FC = () => {
  const { investmentPlans } = useInvestment();

  // Function to generate dynamic colors based on number of plans
  const generateColors = (num: number) => {
    const colors = [];
    const hueStep = 360 / num;
    for (let i = 0; i < num; i++) {
      const hue = i * hueStep;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  };

  // Prepare data for the Pie chart
  const data = useMemo(() => ({
    labels: investmentPlans.map((plan) => plan.category),
    datasets: [
      {
        label: 'Investment Allocation',
        data: investmentPlans.map((plan) => plan.percentage),
        backgroundColor: generateColors(investmentPlans.length),
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  }), [investmentPlans]);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 20,
          padding: 15,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Investment Allocation Breakdown',
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <motion.div
      className="w-full max-w-4xl bg-white shadow-xl rounded-3xl p-6 mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Pie data={data} options={options} />
    </motion.div>
  );
};

// Memoize the component
const InvestmentPieChart = React.memo(InvestmentPieChartComponent);

// Assign a displayName for debugging and ESLint compliance
InvestmentPieChart.displayName = 'InvestmentPieChart';

// Export the memoized component
export default InvestmentPieChart;
