import { Checkbox, InputText, Label, SubmitButton } from '~/components';

const signUpFormId = 'sign-up-form';

export default function SignupForm() {
  return (
    <form method="POST" id={signUpFormId} className="space-y-6">
      <div className="input-group">
        <Label htmlFor="first-name" text="First name" classNames="label-input-text" />
        <InputText
          fieldAttributes={{
            id: 'first-name',
            type: 'text',
            name: 'firstName',
            autoComplete: 'off',
            required: true,
            autoFocus: true,
          }}
        />
      </div>

      <div className="input-group">
        <Label htmlFor="last-name" text="Last name" classNames="label-input-text" />
        <InputText
          fieldAttributes={{ id: 'last-name', type: 'text', name: 'lastName', autoComplete: 'off', required: true }}
        />
      </div>

      <div className="input-group">
        <Label htmlFor="username" text="Username" classNames="label-input-text" />
        <InputText
          fieldAttributes={{ id: 'username', type: 'text', name: 'username', autoComplete: 'off', required: true }}
        />
      </div>

      <div className="input-group">
        <Label htmlFor="email" text="Email address" classNames="label-input-text" />
        <InputText
          fieldAttributes={{
            id: 'email',
            type: 'email',
            name: 'email',
            autoComplete: 'off',
            required: true,
          }}
        />
      </div>
      <div className="input-group">
        <Label htmlFor="password" text="Password" classNames="label-input-text" />
        <InputText
          fieldAttributes={{
            id: 'password',
            type: 'password',
            name: 'password',
            autoComplete: 'off',
            required: true,
          }}
        />
      </div>

      <div className="input-group">
        <Label htmlFor="confirm-password" text="Confirm password" classNames="label-input-text" />
        <InputText
          fieldAttributes={{
            id: 'confirm-password',
            type: 'password',
            name: 'confirmPassword',
            autoComplete: 'off',
            required: true,
          }}
        />
      </div>

      {/* <div className="">
        <Checkbox fieldAttributes={{ id: 'email-subscription', name: 'emailSubscription' }} />
        <Label
          classNames="label-input-checkbox"
          htmlFor="email-subscription"
          text="(Optional) It's to send me emails with Conform updates, tips and tutorials. You can opt out at any time."
        />
      </div> */}

      <SubmitButton fieldAttributes={{ form: signUpFormId }} text="Sign up" />
    </form>
  );
}
