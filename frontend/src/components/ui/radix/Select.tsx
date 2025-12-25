import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { clsx } from 'clsx';

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  placeholder = 'Sélectionner...',
  children,
  disabled,
}) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectPrimitive.Trigger
        className={clsx(
          'flex items-center justify-between w-full px-4 py-2 rounded-lg',
          'bg-white border border-gray-300 text-gray-800',
          'hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <i className="fas fa-chevron-down text-gray-400"></i>
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[var(--radix-select-trigger-width)]">
          <SelectPrimitive.Viewport className="p-2">
            {children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({
  value,
  children,
}) => {
  return (
    <SelectPrimitive.Item
      value={value}
      className="px-4 py-2 rounded-md hover:bg-indigo-50 focus:bg-indigo-50 focus:outline-none cursor-pointer"
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

