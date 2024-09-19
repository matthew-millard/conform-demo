import { useState } from 'react';

type CheckboxProps = {
  fieldAttributes: React.InputHTMLAttributes<HTMLInputElement>;
  defaultChecked?: boolean;
};

export default function Checkbox({ fieldAttributes, defaultChecked }: CheckboxProps) {
  const [checked, setChecked] = useState(() => defaultChecked ?? false);
  return (
    <>
      <input
        {...fieldAttributes}
        type="checkbox"
        className="peer h-4 w-4 rounded appearance-none border-zinc-50 border-2 checked:border-none checked:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus:ring-violet-600 focus-visible:outline-violet-600"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
      />
      <svg
        viewBox="0 0 14 14"
        fill="none"
        className="absolute h-4 w-4 stroke-white hidden peer-checked:block"
        style={{ pointerEvents: 'none' }} // Prevents the SVG from interfering with input
      >
        <path d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    </>
  );
}
