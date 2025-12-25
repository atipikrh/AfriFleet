import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { clsx } from 'clsx';

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  children,
}) => {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className="w-full"
    >
      {children}
    </TabsPrimitive.Root>
  );
};

export const TabsList: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <TabsPrimitive.List
      className={clsx(
        'flex space-x-1 border-b border-gray-200 mb-4',
        className
      )}
    >
      {children}
    </TabsPrimitive.List>
  );
};

export const TabsTrigger: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className }) => {
  return (
    <TabsPrimitive.Trigger
      value={value}
      className={clsx(
        'px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent',
        'hover:text-indigo-600 hover:border-indigo-300',
        'data-[state=active]:text-indigo-600 data-[state=active]:border-indigo-600',
        'transition-colors',
        className
      )}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
};

export const TabsContent: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className }) => {
  return (
    <TabsPrimitive.Content
      value={value}
      className={clsx('focus:outline-none', className)}
    >
      {children}
    </TabsPrimitive.Content>
  );
};

