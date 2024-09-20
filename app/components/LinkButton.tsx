import { Link } from '@remix-run/react';

type LinkButtonProps = {
  children: React.ReactNode;
  to: string;
  prefetch?: 'intent' | 'render' | 'none' | 'viewport';
};

export default function LinkButton({ children, to, prefetch }: LinkButtonProps) {
  const classNames =
    'text-base px-4 py-2 rounded-md bg-button-primary-color text-button-primary-text-color hover:bg-button-primary-color-hover active:bg-button-primary-color-active disabled:bg-button-primary-color-disabled disabled:text-button-primary-text-color-disabled font-medium';

  return (
    <Link to={to} className={classNames} prefetch={prefetch}>
      {children}
    </Link>
  );
}
