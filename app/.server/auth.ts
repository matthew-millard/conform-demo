import bcrypt from 'bcryptjs';
import { prisma } from '~/utils/db.server';
import type { SignupSubmissionValues } from './validation';

// Cookie Expiration Time
const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days

export function getSessionExpirationDate() {
  const expirationDate = new Date(Date.now() + SESSION_EXPIRATION_TIME);
  return expirationDate;
}

export async function getPasswordHash(password: string) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export async function verifyUserPassword(email: string, password: string) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    select: { id: true, password: { select: { hash: true } } },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(password, userWithPassword.password.hash);

  if (!isValid) {
    return null;
  }

  return { id: userWithPassword.id };
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

export async function login({ email, password }: { email: string; password: string }) {
  const user = await verifyUserPassword(email, password);

  if (!user) return null;

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      expirationDate: getSessionExpirationDate(),
    },
    select: { id: true, expirationDate: true, userId: true },
  });

  return session;
}
