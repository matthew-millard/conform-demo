import bcrypt from 'bcryptjs';
import { prisma } from './db';
import type { SignupSubmissionValues } from './validation';
import { getSession } from './session';
import { redirect } from '@remix-run/react';
import { safeRedirect } from 'remix-utils/safe-redirect';
import { combineResponseInits } from '~/utils/misc';
import { sessionKey } from './config';

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

export async function logout(
  {
    request,
    redirectTo = '/',
  }: {
    request: Request;
    redirectTo?: string;
  },
  responseInit?: ResponseInit
) {
  const cookieSession = await sessionStorage.getSession(request.headers.get('cookie'));
  const sessionId = cookieSession.get(sessionKey);
  void prisma.session.delete({ where: { id: sessionId } }).catch(() => {});

  throw redirect(
    safeRedirect(redirectTo),
    combineResponseInits(responseInit, {
      headers: {
        'set-cookie': await sessionStorage.destroySession(cookieSession),
      },
    })
  );
}

export async function getUserId(request: Request) {
  const cookieSession = await getSession(request);
  const sessionId = cookieSession.get(sessionKey);

  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    select: { userId: true },
  });
  if (!session) {
    throw await logout({ request });
  }
  return session.userId;
}
