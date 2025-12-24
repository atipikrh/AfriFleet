import React from 'react';
import { getGlassStyle } from '../../../design-system/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  opacity?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick,
  opacity = 0.7 
}) => {
  const glassStyle = getGlassStyle(opacity);

  return (
    <div
      style={glassStyle}
      className={`rounded-xl sm:rounded-2xl ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

