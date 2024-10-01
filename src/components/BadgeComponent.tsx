

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BadgeProps {
  badge: {
    name: string;
    image: string;
  } | null;
}

const BadgeComponent: React.FC<BadgeProps> = ({ badge }) => {
  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          className="w-full max-w-md bg-white shadow-lg rounded-3xl p-8 text-center mt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <img src={badge.image} alt={badge.name} className="w-24 h-24 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">{badge.name}</h3>
          <p className="text-gray-600">Congratulations! You have earned the {badge.name} badge.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BadgeComponent;
