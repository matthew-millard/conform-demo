import { prisma } from './db';
import { redirect } from '@remix-run/node';
import { sessionStorage } from './session';

export async function getUserData(userId: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      profileImage: true,
      roles: {
        select: {
          name: true,
          permissions: {
            select: {
              action: true,
              entity: true,
              access: true,
            },
          },
        },
      },
    },
    // Include more fields here if needed
  });

  //   Manage weird state where there is a userId in the session but no user in the database
  //   This could occur if the user was deleted from the database but the session still exists
  if (!user) {
    const cookieSession = await sessionStorage.getSession();
    redirect('/', {
      headers: {
        'set-cookie': await sessionStorage.destroySession(cookieSession),
      },
    });
  } else {
    return user;
  }
}
