import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';
import { UpdatePasswordSchema, UsernameSchema } from '~/schemas';
import { prisma } from './db';
import { json, redirect } from '@remix-run/node';
import { setToastCookie, toastSessionStorage } from './toast';
import { getPasswordHash, verifyUserPassword } from './auth';

type ActionArgs = {
  userId: string;
  formData: FormData;
  request: Request;
};

// Update the user's username
export async function usernameUpdateAction({ userId, formData, request }: ActionArgs) {
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
    title: 'Username updated',
  });

  return redirect(`/${username}/settings`, {
    headers: { 'set-cookie': await toastSessionStorage.commitSession(toastCookieSession) },
  });
}

// Update the user's password
export async function passwordUpdateAction({ userId, formData, request }: ActionArgs) {
  const submission = await parseWithZod(formData, {
    async: true,
    schema: UpdatePasswordSchema.transform(async ({ currentPassword, newPassword }, ctx) => {
      // Verify the user's current password
      if (currentPassword && newPassword) {
        const user = await verifyUserPassword({ id: userId }, currentPassword);

        if (!user) {
          ctx.addIssue({
            path: ['currentPassword'],
            code: z.ZodIssueCode.custom,
            message: 'Incorrect password',
          });
        }
      }

      return { currentPassword, newPassword };
    }),
  });

  if (submission.status !== 'success') {
    return json(submission.reply({ hideFields: ['currentPassword', 'newPassword', 'confirmPassword'] }), {
      status: submission.status === 'error' ? 400 : 200,
    });
  }

  const { newPassword } = submission.value;

  // Update the user's password in the database
  const result = await prisma.user.update({
    select: { username: true },
    where: { id: userId },
    data: {
      password: {
        update: {
          hash: await getPasswordHash(newPassword),
        },
      },
    },
  });

  if (!result) {
    return json(
      submission.reply({
        formErrors: ['Something went wrong. Please try again. Error code: 500 - Internal Server Error'],
        hideFields: ['currentPassword', 'newPassword', 'confirmPassword'],
      }),
      { status: 500, statusText: 'Internal Server Error' }
    );
  }

  const { username } = result;

  const toastCookieSession = await setToastCookie(request, {
    type: 'success',
    description: `Your password has been updated successfully.`,
    title: 'Password updated',
  });

  // return redirect(`/${username}/settings`, {
  //   headers: { 'set-cookie': await toastSessionStorage.commitSession(toastCookieSession) },
  // });

  return json(submission.reply({ hideFields: ['currentPassword', 'newPassword', 'confirmPassword'] }), {
    headers: { 'set-cookie': await toastSessionStorage.commitSession(toastCookieSession) },
  });
}
