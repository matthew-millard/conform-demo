import bcrypt from 'bcryptjs';
import { prisma } from '~/utils/db.server';
import type { SignupSubmissionValues } from './validation';

export async function getPasswordHash(password: string) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export async function signup({ firstName, lastName, username, email, password }: SignupSubmissionValues) {
  const passwordHash = await getPasswordHash(password);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      username,
      email,
      password: {
        create: {
          hash: passwordHash,
        },
      },
    },
    select: {
      id: true,
    },
  });

  return user;
}
