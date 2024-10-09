import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';
import { UsernameSchema } from '~/schemas';
import { prisma } from './db';
import { json, redirect } from '@remix-run/node';
import { setToastCookie, toastSessionStorage } from './toast';

export async function usernameUpdateAction({
  userId,
  formData,
  request,
}: {
  userId: string;
  formData: FormData;
  request: Request;
}) {
  const submission = await parseWithZod(formData, {
    async: true,
    schema: z
      .object({
        username: UsernameSchema,
      })
      .transform(async ({ username }, ctx) => {
        // Check if the username is already taken
        if (username) {
          const user = await prisma.user.findFirst({
            where: {
              username,
            },
            select: {
              id: true,
            },
          });

          if (user?.id !== userId && user) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Username is already taken',
              path: ['username'],
            });
            return;
          }
        }

        return { username };
      }),
  });

  if (submission.status !== 'success') {
    return json(submission.reply(), {
      status: submission.status === 'error' ? 400 : 200,
    });
  }

  const { username } = submission.value as { username: string };

  //   Update the user's username in the database
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username,
    },
  });

  if (!result) {
    return json(
      submission.reply({
        formErrors: ['Something went wrong. Please try again. Error code: 500 - Internal Server Error'],
      }),
      { status: 500, statusText: 'Internal Server Error' }
    );
  }

  const toastCookieSession = await setToastCookie(request, {
    type: 'success',
    description: `Your username has been updated to ${username}.`,
    title: 'Updated username',
  });

  return redirect(`/${username}/settings`, {
    headers: { 'set-cookie': await toastSessionStorage.commitSession(toastCookieSession) },
  });
}
