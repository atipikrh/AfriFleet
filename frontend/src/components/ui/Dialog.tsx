import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'

export const DialogRoot = Dialog.Root
export const DialogTrigger = Dialog.Trigger

export function DialogContent({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/40" />
      <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}

