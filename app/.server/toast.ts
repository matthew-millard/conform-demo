import { createCookieSessionStorage } from '@remix-run/node';
import { cookiePrefix } from './config';

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
