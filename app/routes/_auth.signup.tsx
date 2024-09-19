import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { signup } from '~/.server/auth';
import { checkCSRF } from '~/.server/csrf';
import { checkHoneypot } from '~/.server/honeypot';
import { parseWithZodAndCheckUniqueness } from '~/.server/validation';
import { Hyperlink, Logo } from '~/components';
import { SignupForm } from '~/ui';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  await checkCSRF(formData, request.headers);
  checkHoneypot(formData);
  const submission = await parseWithZodAndCheckUniqueness(formData); // Includes username and email uniqueness check

  if (submission.status !== 'success') {
    return json(submission.reply(), {
      status: submission.status === 'error' ? 400 : 200,
    });
  }

  const { firstName, lastName, username, email, password } = submission.value;

  const user = await signup({ firstName, lastName, username, email, password });

  if (!user) {
    return json(submission.reply({ formErrors: ['An unexpected error occured. Please try again.'] }), {
      status: 500,
    });
  }

  return redirect('/login', 302);
}

export default function SignupRoute() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 sm:rounded-lg sm:bg-card-background-color border border-card-border-color sm:mx-auto sm:w-full sm:max-w-[480px]">
      <Logo />
      <h2 className="mt-8 text-center">Sign up for an account</h2>

      <div className="px-6 pt-12 pb-6 sm:px-12">
        <SignupForm />
        <p className="pt-3">
          By signing up, you agree to Conform's{' '}
          <Hyperlink children="Terms of Service" fieldAttributes={{ href: '/terms' }} /> and{' '}
          <Hyperlink children="Privacy Policy" fieldAttributes={{ href: '/privacy' }} />
        </p>
      </div>

      <p className="text-center">
        <Hyperlink children=" Already have an account?" fieldAttributes={{ href: '/login' }} />
      </p>
    </div>
  );
}
