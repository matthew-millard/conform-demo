import { KeyIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { passwordUpdateAction, usernameUpdateAction } from '~/.server/actions';
import { requireUser } from '~/.server/auth';
import { UpdatePasswordForm, UpdateUsernameForm } from '~/forms';
import { invariantResponse } from '~/utils/misc';

export const updateUsernameActionIntent = 'update-username';
export const updatePasswordActionIntent = 'update-password';

export async function action({ request, params }: ActionFunctionArgs) {
  const { id, username } = await requireUser(request);
  const userId = id;
  invariantResponse(username === params.username, 'Not authorized', {
    status: 403,
    statusText: 'Unauthorized',
  });
  const formData = await request.formData();
  const intent = formData.get('intent');

  switch (intent) {
    case updateUsernameActionIntent: {
      return usernameUpdateAction({ userId, formData, request });
    }
    case updatePasswordActionIntent: {
      return passwordUpdateAction({ userId, formData, request });
    }
    default: {
      throw new Response(`Invalid intent: ${intent}`, { status: 400, statusText: 'Bad Request' });
    }
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { id, username } = await requireUser(request);
  invariantResponse(username === params.username, "Sorry, we could't find the page you're looking for.", {
    status: 404,
    statusText: 'Page not found.',
  });

  return { id, username };
}

export default function UserAccountSettingsRoute() {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-24">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface sm:text-5xl">Account Settings</h1>
          <p className="mt-4 text-base leading-7 text-on-surface-variant">
            Manage your account details, security settings, and preferences.
          </p>
        </div>
      </div>

      <div className="relative mx-auto max-w-[40rem] space-y-16 divide-y divide-across-surface">
        {/* Update Username */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center">
              <UserCircleIcon className="w-8 h-8 flex-none text-primary stroke-1" />
              <h2 className="ml-4 text-lg font-semibold leading-7 text-on-surface">Username</h2>
            </div>
            <p className="mt-3 max-w-none text-sm leading-6 text-on-surface-variant">
              Update your username associated with you account.
            </p>
          </div>
          <UpdateUsernameForm />
        </section>

        {/* Update Password */}
        <section className="px-4 sm:px-6 lg:px-8 pt-16">
          <div>
            <div className="flex items-center">
              <KeyIcon className="w-8 h-8 flex-none text-primary stroke-1" />
              <h2 className="ml-4 text-lg font-semibold leading-7 text-on-surface">Password</h2>
            </div>
            <p className="mt-3 max-w-none text-sm leading-6 text-on-surface-variant">
              Update your password associated with you account.
            </p>
          </div>
          <UpdatePasswordForm />
        </section>
      </div>
    </>
  );
}
