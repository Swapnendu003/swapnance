

'use client';

import React from 'react';

interface InvestmentBadgeProps {
  name: string;
  tier: string;
}

const InvestmentBadge: React.FC<InvestmentBadgeProps> = ({ name, tier }) => {
  // Define colors for different tiers
  const tierColors: { [key: string]: string } = {
    'Visionary Vanguard': 'bg-gradient-to-br from-purple-400 to-pink-600',
    'Strategic Sentinel': 'bg-gradient-to-br from-green-400 to-blue-600',
    'Growth Guardian': 'bg-gradient-to-br from-yellow-400 to-red-600',
  };

  return (
    <div className={`w-64 h-64 flex flex-col items-center justify-center rounded-full text-white shadow-lg ${tierColors[tier] || 'bg-gray-500'}`}>
      <h2 className="text-2xl font-bold">{name || 'Your Name'}</h2>
      <p className="mt-2 text-lg">{tier || 'Your Tier'}</p>
    </div>
  );
};

export default InvestmentBadge;
