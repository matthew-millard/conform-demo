import { createCookieSessionStorage } from '@remix-run/node';
import { cookiePrefix } from './config';

console.log('cookiePrefix:', cookiePrefix);

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: `${cookiePrefix}_session_id`,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function getCookie(request: Request) {
  const cookie = request.headers.get('Cookie');
  return sessionStorage.getSession(cookie);
}

export async function getSession(request: Request) {
  const cookie = request.headers.get('Cookie');
  return sessionStorage.getSession(cookie);
}
