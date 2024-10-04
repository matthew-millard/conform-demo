import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { safeRedirect } from 'remix-utils/safe-redirect';
import { requireAnonymous, signup } from '~/.server/auth';
import { checkCSRF } from '~/.server/csrf';
import { checkHoneypot } from '~/.server/honeypot';
import { parseWithZodAndCheckUniqueness } from '~/.server/validation';
import { Hyperlink, PreTextWithLink } from '~/components';
import { SignupForm } from '~/ui';

export async function action({ request }: ActionFunctionArgs) {
  await requireAnonymous(request);
  const formData = await request.formData();
  await checkCSRF(formData, request.headers);
  checkHoneypot(formData);
  const submission = await parseWithZodAndCheckUniqueness(formData); // Includes username and email uniqueness check

  if (submission.status !== 'success') {
    return json(submission.reply(), {
      status: submission.status === 'error' ? 400 : 200,
    });
  }

  const { firstName, lastName, username, email, password, redirectTo } = submission.value;

  const user = await signup({ firstName, lastName, username, email, password });

  if (!user) {
    return json(submission.reply({ formErrors: ['An unexpected error occured. Please try again.'] }), {
      status: 500,
    });
  }

  return redirect(safeRedirect(redirectTo));
}

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAnonymous(request);
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get('redirectTo');

  return json({ redirectTo });
}

export default function SignupRoute() {
  return (
    <div className="mx-auto sm:w-full sm:max-w-3xl">
      <div className="py-12 sm:px-6 lg:px-8 sm:rounded-xl sm:shadow-lg sm:bg-surface sm:border sm:border-around-surface">
        <h2 className="mt-2 text-center font-bold">Sign up for an account</h2>
        <p className="mt-2 text-center text-on-surface-variant">Create an account to start using Hospo Hub</p>

        <div className="px-6 pt-14 sm:px-12">
          <SignupForm />
          <p className="pt-3 text-sm text-on-surface">
            By signing up, you agree to Hospo Hub's <Hyperlink text="Terms of Service" to="/terms" /> and{' '}
            <Hyperlink text="Privacy Policy" to="/privacy" />
          </p>
        </div>
        <PreTextWithLink preText="Already have an account?" text="Log in" to="/login" />
      </div>
    </div>
  );
}
