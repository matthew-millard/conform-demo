import { createCookieSessionStorage } from '@remix-run/node';
import { cookiePrefix } from './config';
import { toast } from 'sonner';

export const toastKey = 'toast';

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

export const toastSessionStorage = createCookieSessionStorage({
  cookie: {
    name: `${cookiePrefix}_toast`,
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function setToastCookie(
  request: Request,
  value: {
    id: string;
    type: 'success' | 'info' | 'warning' | 'error';
    title: string;
    description: string | undefined;
  }
) {
  const toastCookieSession = await getToastCookie(request);
  toastCookieSession.flash(toastKey, value);

  return toastCookieSession;
}

export async function getToastCookie(request: Request) {
  const cookie = request.headers.get('cookie');
  const toastCookieSession = await toastSessionStorage.getSession(cookie);

  return toastCookieSession;
}

export async function getToast(request: Request) {
  const toastCookieSession = await getToastCookie(request);
  const toast = toastCookieSession.get(toastKey);
  return {
    toast,
    toastCookieSession,
  };
}
