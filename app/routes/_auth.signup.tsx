import { parseWithZod } from '@conform-to/zod';
import { ActionFunctionArgs } from '@remix-run/node';
import { Hyperlink, Logo } from '~/components';
import { SignupSchema } from '~/schemas';
import { SignupForm } from '~/ui';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const submission = await parseWithZod(formData, {
    async: true,
    schema: SignupSchema.transform(async (data, ctx) => {
      // Todo - validate the user does not already exist
      return data;
    }),
  });

  console.log('submission', submission);

  if (submission.status !== 'success') {
    return submission.reply();
  }

  // Todo - save the user to the database

  return {};
}

export default function SignupRoute() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 sm:rounded-lg sm:bg-zinc-800/20 sm:mx-auto sm:w-full sm:max-w-[480px]">
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
    </div>
  );
}
