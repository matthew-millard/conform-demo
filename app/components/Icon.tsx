import { SVGProps } from 'react';

export default function Icon({ children }: SVGProps<SVGSVGElement>) {
  return (
    <span className="text-icon-text-color hover:text-icon-text-color-hover active:text-icon-text-color-active">
      {children}
    </span>
  );
}
