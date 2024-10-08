import React from 'react';
import { FinanceProvider } from '@/utils/FinanceContext';

import Dashboard from '@/components/Dashboard';

const FinanceTracker: React.FC = () => {
  return (
    <FinanceProvider>
      <div className=" mx-auto">
        <Dashboard />


      </div>
    </FinanceProvider>
  );
};

export default FinanceTracker;
