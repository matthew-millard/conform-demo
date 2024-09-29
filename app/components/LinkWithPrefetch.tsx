import { Link } from '@remix-run/react';

type LinkWithPrefetchProps = {
  to: string;
  prefetch?: 'none' | 'intent' | 'render' | 'viewport';
  children: React.ReactNode;
};

export default function LinkWithPrefetch({ to, prefetch = 'intent', children }: LinkWithPrefetchProps) {
  const classNames = 'text-base text-on-surface hover:text-on-surface-variant font-medium';

  return (
    <Link to={to} prefetch={prefetch} className={classNames}>
      {children}
    </Link>
  );
}
