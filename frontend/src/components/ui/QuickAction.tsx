import React from 'react';

interface QuickActionProps {
  icon: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

export const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  label,
  onClick,
  className = '',
}) => {
  return (
    <button
      className={`quick-action gradient-primary/10 text-indigo-600 p-4 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center ${className}`}
      onClick={onClick}
    >
      <i className={`${icon} mb-2 text-xl sm:text-2xl`}></i>
      <span className="text-xs sm:text-sm font-medium">{label}</span>
    </button>
  );
};

