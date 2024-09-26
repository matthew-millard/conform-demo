import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';
import { SignupSchema } from '~/schemas';
import { prisma } from './db';

export type SignupSubmissionValues = Omit<z.infer<typeof SignupSchema>, 'confirmPassword'>;

export async function parseWithZodAndCheckUniqueness(formData: FormData) {
  return await parseWithZod(formData, {
    async: true,
    schema: SignupSchema.transform(async (data, ctx) => {
      const userExists = await prisma.user.findFirst({
        where: {
          OR: [{ email: data.email }, { username: data.username }],
        },
      });

      if (userExists) {
        if (userExists.email === data.email) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Email already exists',
            path: ['email'],
          });
        }

        if (userExists.username === data.username) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Username already exists',
            path: ['username'],
          });
        }
      }

      return data;
    }),
  });
}
