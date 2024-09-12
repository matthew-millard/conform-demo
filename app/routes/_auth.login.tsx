import { parseWithZod } from '@conform-to/zod';
import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { z } from 'zod';
import { login, sessionKey } from '~/.server/auth';
import { getCookie, sessionStorage } from '~/.server/session';
import { Hyperlink, Logo } from '~/components';
import { LoginSchema } from '~/schemas/auth';
import { LoginForm } from '~/ui';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
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

  const { session, rememberMe } = submission.value;

  const cookieSession = await getCookie(request);
  cookieSession.set(sessionKey, session.id);

  return redirect('/', {
    headers: {
      'set-cookie': await sessionStorage.commitSession(cookieSession, {
        expires: rememberMe ? session.expirationDate : undefined,
      }),
    },
  });
}

export default function LoginRoute() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 sm:rounded-lg sm:bg-zinc-800/20 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <Logo />
        <h2 className="mt-8 text-center">Log in to your account</h2>

        <div className="px-6 py-12 sm:px-12">
          <LoginForm />
        </div>
        <p className="text-center">
          Need an account? <Hyperlink children="Sign up here" fieldAttributes={{ href: '/signup' }} />
        </p>
      </div>
    </div>
  );
}
