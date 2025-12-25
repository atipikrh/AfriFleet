import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  trigger,
  children,
  title,
  description,
}) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogPrimitive.Trigger asChild>
          {trigger}
        </DialogPrimitive.Trigger>
      )}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl z-50 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
          {title && (
            <DialogPrimitive.Title className="text-xl font-bold text-gray-800 mb-2">
              {title}
            </DialogPrimitive.Title>
          )}
          {description && (
            <DialogPrimitive.Description className="text-sm text-gray-600 mb-4">
              {description}
            </DialogPrimitive.Description>
          )}
          {children}
          <DialogPrimitive.Close asChild>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <i className="fas fa-times"></i>
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

