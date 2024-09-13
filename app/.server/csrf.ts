import { CSRF, CSRFError } from 'remix-utils/csrf/server';
import { createCookie } from '@remix-run/node';
import { cookiePrefix } from './auth';

export const cookie = createCookie(`${cookiePrefix}_csrfToken`, {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  secrets: [process.env.SESSION_SECRET!],
});

export const csrf = new CSRF({
  cookie,
});

export async function checkCSRF(formData: FormData, headers: Headers) {
  try {
    await csrf.validate(formData, headers);
  } catch (error) {
    if (error instanceof CSRFError) {
      throw new Response('Invalid CSRF token', { status: 403 });
    }
    throw error;
  }
}
