import { Link } from '@remix-run/react';

export default function LinkWithPrefetch() {
  const classNames =
    'text-base px-4 py-2 text-link-text-color hover:text-link-text-color-hover active:text-link-text-color-active font-medium';

  return (
    <Link to="/login" prefetch="intent" className={classNames}>
      <span>Log in →</span>
    </Link>
  );
}
