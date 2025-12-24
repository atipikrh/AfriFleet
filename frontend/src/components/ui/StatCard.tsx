import React from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  gradient?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  gradient = 'from-indigo-600 to-purple-600',
  className = '',
}) => {
  return (
    <div className={`stat-card rounded-xl sm:rounded-2xl p-4 sm:p-5 ${className}`}>
      <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {value}
      </div>
      <div className="text-xs sm:text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
};

