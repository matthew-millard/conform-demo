import { Honeypot, SpamError } from 'remix-utils/honeypot/server';

const honeypot = new Honeypot({
  validFromFieldName: process.env.TESTING ? null : undefined,
});

export function checkHoneypot(formData: FormData) {
  try {
    honeypot.check(formData);
  } catch (error) {
    if (error instanceof SpamError) {
      throw new Response('Form not submitted properly', { status: 400 });
    }
    throw error;
  }
}

export default honeypot;
