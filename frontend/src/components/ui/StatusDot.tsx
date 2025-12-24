import React from 'react';

interface StatusDotProps {
  color: 'success' | 'warning' | 'danger' | 'gray';
  className?: string;
}

export const StatusDot: React.FC<StatusDotProps> = ({ color, className = '' }) => {
  const colorClasses = {
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    gray: 'bg-gray-400',
  };

  return (
    <span className={`status-dot ${colorClasses[color]} ${className}`}></span>
  );
};

