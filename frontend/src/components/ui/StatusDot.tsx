import React from 'react';
import { colors } from '../../../design-system/colors';

interface StatusDotProps {
  color: 'success' | 'warning' | 'danger' | 'gray';
  className?: string;
}

export const StatusDot: React.FC<StatusDotProps> = ({ color, className = '' }) => {
  const getColorStyle = () => {
    switch (color) {
      case 'success':
        return { backgroundColor: colors.success };
      case 'warning':
        return { backgroundColor: colors.warning };
      case 'danger':
        return { backgroundColor: colors.danger };
      case 'gray':
        return { backgroundColor: '#9ca3af' };
      default:
        return { backgroundColor: colors.success };
    }
  };

  return (
    <span 
      className={`status-dot ${className}`}
      style={getColorStyle()}
    ></span>
  );
};

