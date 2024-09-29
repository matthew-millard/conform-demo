import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { Form } from '@remix-run/react';
import { AuthenticityTokenInput } from 'remix-utils/csrf/react';

export default function LogoutForm() {
  const classNames = 'text-base px-4 flex gap-1 py-2 text-on-surface hover:text-on-surface-variant font-medium';
  return (
    <Form method="POST" action="/logout">
      <AuthenticityTokenInput />
      <button type="submit" className={classNames}>
        <ArrowRightStartOnRectangleIcon aria-hidden="true" className="h-6 w-6" />
        Log out
      </button>
    </Form>
  );
}
