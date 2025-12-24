import React from 'react';
import { useButtonVariant, useShadow } from '../../../design-system/hooks';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
  variant = 'primary',
  disabled = false,
}) => {
  const buttonStyle = useButtonVariant(variant);
  const shadow = useShadow(
    variant === 'primary' ? 'glowPrimary' : 
    variant === 'secondary' ? 'glowSecondary' : 
    'glowAccent'
  );

  const baseClasses = 'text-white py-3 rounded-lg font-medium transition-all relative overflow-hidden';
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : '';

  return (
    <button
      type={type}
      style={{
        ...buttonStyle,
        boxShadow: shadow,
      }}
      className={`${baseClasses} ${disabledClasses} ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

