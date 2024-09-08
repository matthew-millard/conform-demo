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
        className="peer input-checkbox"
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
