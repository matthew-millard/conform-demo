import { Link } from '@remix-run/react';

type LinkButtonProps = {
  children: React.ReactNode;
  to: string;
  prefetch?: 'intent' | 'render' | 'none' | 'viewport';
};

export default function LinkButton({ children, to, prefetch }: LinkButtonProps) {
  const classNames = `text-base px-4 py-2 rounded-md text-on-primary bg-primary hover:bg-primary-variant font-medium`;

  return (
    <Link to={to} className={classNames} prefetch={prefetch}>
      {children}
    </Link>
  );
}
