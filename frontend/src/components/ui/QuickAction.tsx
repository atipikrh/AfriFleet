import React from 'react';
import { useColor, useColorWithOpacity } from '../../../design-system/hooks';
import { colors } from '../../../design-system/colors';

interface QuickActionProps {
  icon: string;
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  label,
  onClick,
  variant = 'primary',
  className = '',
}) => {
  const primaryColor = useColor(variant, 600);
  const bgColor = useColorWithOpacity(colors[variant].DEFAULT, 0.1);

  return (
    <button
      className={`quick-action p-4 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center ${className}`}
      style={{
        backgroundColor: bgColor,
        color: primaryColor,
      }}
      onClick={onClick}
    >
      <i className={`${icon} mb-2 text-xl sm:text-2xl`}></i>
      <span className="text-xs sm:text-sm font-medium">{label}</span>
    </button>
  );
};

