import { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/react';
import { checkCSRF } from '~/.server/csrf';
import { sessionStorage } from '~/.server/session';

export async function loader() {
  return redirect('/');
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  await checkCSRF(formData, request.headers);
  const cookieSession = await sessionStorage.getSession();

  return redirect('/', {
    headers: {
      'set-cookie': await sessionStorage.destroySession(cookieSession),
    },
  });
}
