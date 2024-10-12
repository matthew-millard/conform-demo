import { ArrowRightEndOnRectangleIcon, KeyIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { logOutOtherSessionsAction, passwordUpdateAction, usernameUpdateAction } from '~/.server/actions';
import { requireUser } from '~/.server/auth';
import { prisma } from '~/.server/db';
import { LogOutOfOtherSessionsForm, UpdatePasswordForm, UpdateUsernameForm } from '~/forms';
import { invariantResponse } from '~/utils/misc';

export const updateUsernameActionIntent = 'update-username';
export const updatePasswordActionIntent = 'update-password';
export const logOutOfOtherSessionsActionIntent = 'log-out-of-other-sessions';

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
    case logOutOfOtherSessionsActionIntent: {
      return logOutOtherSessionsAction({ userId, formData, request });
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

  // Get user's data and return it
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      _count: {
        select: {
          sessions: {
            where: { expirationDate: { gt: new Date() } },
          },
        },
      },
      email: true,
    },
  });

  return json({ user });
}

export default function UserAccountSettingsRoute() {
  const data = useLoaderData<typeof loader>();

  const otherSessionCount = (data.user?._count?.sessions || 0) - 1;

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

        {/* Log out of other sessions */}
        <section className="px-4 sm:px-6 lg:px-8 pt-16">
          <div>
            <div className="flex items-center">
              <ArrowRightEndOnRectangleIcon className="w-8 h-8 flex-none text-primary stroke-1" />
              <h2 className="ml-4 text-lg font-semibold leading-7 text-on-surface">Log out other sessions</h2>
            </div>
            <p className="mt-3 max-w-none text-sm leading-6 text-on-surface-variant">
              {otherSessionCount
                ? `You are currently logged in on ${otherSessionCount} other ${otherSessionCount === 1 ? 'session' : 'sessions'} across all of your devices`
                : 'You are not logged in on any other sessions across all of your devices.'}
            </p>
          </div>
          <LogOutOfOtherSessionsForm />
        </section>
      </div>
    </>
  );
}
