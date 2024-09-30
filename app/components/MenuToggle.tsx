import { PopoverButton } from '@headlessui/react';

export default function MenuToggle({ children }: { children: React.ReactNode }) {
  return (
    <PopoverButton className="relative inline-flex border border-transparent items-center justify-center rounded-md  p-2 text-on-surface focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
      {children}
    </PopoverButton>
  );
}
