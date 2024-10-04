import { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/react';
import { requireUserId } from '~/.server/auth';
import { checkCSRF } from '~/.server/csrf';
import { sessionStorage } from '~/.server/session';
import { setToastCookie, toastSessionStorage } from '~/.server/toast';
import { combineHeaders } from '~/utils/misc';

export async function loader() {
  return redirect('/');
}

export async function action({ request }: ActionFunctionArgs) {
  await requireUserId(request);
  const formData = await request.formData();
  await checkCSRF(formData, request.headers);
  const cookieSession = await sessionStorage.getSession();

  const toastCookieSession = await setToastCookie(request, {
    type: 'success',
    description: 'You have been logged out successfully.',
    title: 'Logged out',
  });

  const combinedHeaders = combineHeaders(
    {
      'set-cookie': await sessionStorage.destroySession(cookieSession),
    },
    { 'set-cookie': await toastSessionStorage.commitSession(toastCookieSession) }
  );

  return redirect('/', {
    headers: combinedHeaders,
  });
}
