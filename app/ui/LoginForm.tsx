import { Hyperlink, InputText, Label, RememberMe, SubmitButton } from '~/components';

const loginFormId = 'login-form';

export default function LoginForm() {
  return (
    <form action="/login" method="POST" id={loginFormId} className="space-y-6">
      <div className="input-group">
        <Label htmlFor="email" text="Email address" classNames="label-input-text" />
        <InputText
          fieldAttributes={{
            id: 'email',
            type: 'email',
            name: 'email',
            autoFocus: true,
            autoComplete: 'off',
            required: true,
          }}
        />
      </div>

      <div className="input-group">
        <Label htmlFor="password" text="Password" classNames="label-input-text" />
        <InputText
          fieldAttributes={{ id: 'password', type: 'password', name: 'password', autoComplete: 'off', required: true }}
        />
      </div>

      <div className="flex items-center justify-between">
        <RememberMe />
        <Hyperlink children={'Forgot password?'} fieldAttributes={{ href: '/password/reset' }} />
      </div>

      <SubmitButton fieldAttributes={{ form: loginFormId }} text="Log in" />
    </form>
  );
}
