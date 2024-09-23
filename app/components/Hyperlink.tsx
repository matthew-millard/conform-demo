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
      className=" font-bold text-sm  text-hyperlink-color hover:text-hyperlink-color-hover  focus-visible:outline focus-visible:outline-2 focus:ring-ring-color focus-visible:outline-ring-color rounded-sm"
    >
      {text}
    </Link>
  );
}
