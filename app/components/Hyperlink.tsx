import { Link } from '@remix-run/react';
import React from 'react';

export type HyperlinkProps = {
  text: string;
  to: string;
  title?: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
};

export default function Hyperlink({ to, text, title, target }: HyperlinkProps) {
  return (
    <Link
      to={to}
      title={title}
      target={target}
      className=" font-bold text-sm text-primary hover:text-primary-variant  focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded-sm"
    >
      {text}
    </Link>
  );
}
