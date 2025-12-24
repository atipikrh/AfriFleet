import React from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  variant = 'primary',
  className = '',
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return 'from-indigo-600 to-purple-600';
      case 'secondary':
        return 'from-green-600 to-emerald-600';
      case 'accent':
        return 'from-amber-600 to-orange-600';
      case 'success':
        return 'from-green-600 to-emerald-600';
      case 'warning':
        return 'from-amber-600 to-orange-600';
      case 'danger':
        return 'from-red-600 to-rose-600';
      default:
        return 'from-indigo-600 to-purple-600';
    }
  };

  return (
    <div className={`stat-card rounded-xl sm:rounded-2xl p-4 sm:p-5 ${className}`}>
      <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${getGradientColors()} bg-clip-text text-transparent`}>
        {value}
      </div>
      <div className="text-xs sm:text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
};

