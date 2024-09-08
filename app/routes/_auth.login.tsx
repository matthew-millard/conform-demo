import { Hyperlink, Logo } from '~/components';
import { LoginForm } from '~/ui';

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
