import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { Form } from '@remix-run/react';
import { AuthenticityTokenInput } from 'remix-utils/csrf/react';

export default function LogoutForm() {
  return (
    <Form method="POST" action="/logout">
      <AuthenticityTokenInput />
      <button type="submit" className="flex flex-1">
        <ArrowRightStartOnRectangleIcon aria-hidden="true" className="h-6 w-6 text-primary" />
        <span className="ml-3 text-on-surface">Log out</span>
      </button>
    </Form>
  );
}
