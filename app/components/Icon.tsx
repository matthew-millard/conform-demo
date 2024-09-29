import { SVGProps } from 'react';

export default function Icon({ children }: SVGProps<SVGSVGElement>) {
  return <span className="text-on-surface hover:text-on-surface-variant">{children}</span>;
}
