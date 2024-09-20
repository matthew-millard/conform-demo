import { PopoverButton } from '@headlessui/react';

export default function MenuToggle({ children }: { children: React.ReactNode }) {
  return (
    <PopoverButton className="relative inline-flex border border-popover-button-border-color items-center justify-center rounded-md bg-popover-button-background-color p-2 text-popover-button-icon-color focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring-color">
      {children}
    </PopoverButton>
  );
}
