import { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/react';
import { checkCSRF } from '~/.server/csrf';
import { sessionStorage } from '~/.server/session';
import { toastSessionStorage } from '~/.server/toast';
import { combineHeaders } from '~/utils/misc';

export async function loader() {
  return redirect('/');
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  await checkCSRF(formData, request.headers);
  const cookieSession = await sessionStorage.getSession();
  const cookie = request.headers.get('cookie');

  const toastCookieSession = await toastSessionStorage.getSession(cookie);
  toastCookieSession.set('toast', {
    type: 'success',
    title: 'Logged out',
    description: 'Your have been logged out',
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
