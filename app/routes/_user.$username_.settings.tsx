import { UserCircleIcon } from '@heroicons/react/24/outline';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { requireUser } from '~/.server/auth';
import { invariantResponse } from '~/utils/misc';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { id, username } = await requireUser(request);
  invariantResponse(username === params.username, "Sorry, we could't find the page you're looking for.", {
    status: 404,
    statusText: 'Page not found.',
  });
  console.log(`User ID: ${id}, Username: ${username}`);
  return {};
}

export default function UserAccountSettingsRoute() {
  return (
    <div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-24">
      <h1 className="text-4xl font-extrabold tracking-tight text-on-surface sm:text-5xl">Account Settings</h1>
      <p className="mt-4 text-base leading-7 text-on-surface-variant">
        Manage the email address and password associated with your account.
      </p>
    </div>
  );
}
