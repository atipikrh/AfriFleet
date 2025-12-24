import React from 'react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'accent';
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
  variant = 'primary',
}) => {
  const variantClasses = {
    primary: 'btn-gradient',
    secondary: 'gradient-secondary',
    accent: 'gradient-accent',
  };

  return (
    <button
      type={type}
      className={`${variantClasses[variant]} text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

