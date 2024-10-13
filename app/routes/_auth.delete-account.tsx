import { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/react';
import { requireUser } from '~/.server/auth';
import { prisma } from '~/.server/db';
import { getSession, sessionStorage } from '~/.server/session';

export async function loader() {
  return redirect('/');
}

export async function action({ request }: ActionFunctionArgs) {
  const { id } = await requireUser(request);
  const session = await getSession(request);

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error('Failed to delete user', error);
    throw new Error('Failed to delete user');
  }

  return redirect('/', {
    headers: {
      'set-cookie': await sessionStorage.destroySession(session),
    },
  });
}
