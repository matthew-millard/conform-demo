import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { safeRedirect } from 'remix-utils/safe-redirect';
import { z } from 'zod';
import { login, requireAnonymous } from '~/.server/auth';
import { sessionKey } from '~/.server/config';
import { checkCSRF } from '~/.server/csrf';
import { checkHoneypot } from '~/.server/honeypot';
import { getCookie, sessionStorage } from '~/.server/session';
import { PreTextWithLink } from '~/components';
import { LoginSchema } from '~/schemas/auth';
import { LoginForm } from '~/forms';

export async function action({ request }: ActionFunctionArgs) {
  await requireAnonymous(request);
  const formData = await request.formData();
  await checkCSRF(formData, request.headers);
  checkHoneypot(formData);

  const submission = await parseWithZod(formData, {
    async: true,
    schema: LoginSchema.transform(async (data, ctx) => {
      const session = await login(data);

      if (!session) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid username or password',
        });
        return z.NEVER;
      }

      return { ...data, session };
    }),
  });

  if (submission.status !== 'success') {
    return json(
      submission.reply({
        formErrors: ['Invalid email or password.'],
        hideFields: ['password'],
      }),
      { status: submission.status === 'error' ? 400 : 200 }
    );
  }

  const { session, rememberMe, redirectTo } = submission.value;

  const cookieSession = await getCookie(request);

  cookieSession.set(sessionKey, session.id);

  return redirect(safeRedirect(redirectTo), {
    headers: {
      'set-cookie': await sessionStorage.commitSession(cookieSession, {
        expires: rememberMe ? session.expirationDate : undefined,
      }),
    },
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAnonymous(request);
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get('redirectTo');

  return json({ redirectTo });
}

export default function LoginRoute() {
  const { redirectTo } = useLoaderData<typeof loader>();

  const [form, fields] = useForm({
    id: 'redirect-path-form',
    constraint: getZodConstraint(
      z.object({
        redirectTo: z.string().optional(),
      })
    ),
    defaultValue: {
      redirectTo,
    },
  });
  return (
    <div className="flex flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 sm:rounded-xl sm:shadow-lg sm:border sm:border-around-surface sm:mx-auto sm:w-full sm:max-w-[480px]">
      <h2 className="mt-10 text-center font-bold">Log in to your account</h2>

      <div className="px-6 pt-10 sm:px-12">
        <LoginForm />
      </div>

      {/* If a redirect path exists, then use the form to pass the value along to the sign up route */}
      {redirectTo ? (
        <Form method="get" action="/signup" {...getFormProps(form)}>
          <input {...getInputProps(fields.redirectTo, { type: 'hidden' })} />
          <p className="mt-4 text-center text-sm font-medium text-on-surface">
            Need an account?{' '}
            <button
              className=" font-bold text-sm text-primary hover:text-primary-variant  focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded-sm"
              type="submit"
            >
              Sign up here
            </button>
          </p>
        </Form>
      ) : (
        <PreTextWithLink preText="Need an account?" text="Sign up here" to="/signup" />
      )}
    </div>
  );
}
