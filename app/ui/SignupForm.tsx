import { action } from '~/routes/_auth.signup';
import { Form, useActionData } from '@remix-run/react';
import { InputText, Label, SubmitButton } from '~/components';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { SignupSchema } from '~/schemas';

export default function SignupForm() {
  const lastResult = useActionData<typeof action>();

  const [form, fields] = useForm({
    id: 'sign-up-form',
    lastResult,
    constraint: getZodConstraint(SignupSchema),
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SignupSchema });
    },
  });

  return (
    <Form method="POST" {...getFormProps(form)} className="space-y-6">
      <div className="input-group">
        <Label htmlFor={fields.firstName.id} text="First name" classNames="label-input-text" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.firstName, { type: 'text' }),
            autoFocus: true,
            autoComplete: 'off',
            required: true,
          }}
        />
        <p id={fields.firstName.errorId} className="text-red-600 text-xs">
          {fields.firstName.errors}
        </p>
      </div>

      <div className="input-group">
        <Label htmlFor={fields.lastName.id} text="Last name" classNames="label-input-text" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.lastName, { type: 'text' }),
            autoComplete: 'off',
            required: true,
          }}
        />
        <p id={fields.lastName.errorId} className="text-red-600">
          {fields.lastName.errors}
        </p>
      </div>

      <div className="input-group">
        <Label htmlFor={fields.username.id} text="Username" classNames="label-input-text" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.username, { type: 'text' }),
            autoComplete: 'off',
            required: true,
          }}
        />
        <p id={fields.username.errorId} className="text-red-600">
          {fields.username.errors}
        </p>
      </div>

      <div className="input-group">
        <Label htmlFor={fields.email.id} text="Email address" classNames="label-input-text" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.email, { type: 'email' }),
            autoComplete: 'off',
            required: true,
          }}
        />
        <p id={fields.email.errorId} className="text-red-600">
          {fields.email.errors}
        </p>
      </div>
      <div className="input-group">
        <Label htmlFor="password" text="Password" classNames="label-input-text" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.password, { type: 'password' }),
            autoComplete: 'off',
            required: true,
          }}
        />
        <p id={fields.password.errorId} className="text-red-600">
          {fields.password.errors}
        </p>
      </div>

      <div className="input-group">
        <Label htmlFor="confirm-password" text="Confirm password" classNames="label-input-text" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.confirmPassword, { type: 'password' }),
            autoComplete: 'off',
            required: true,
          }}
        />
        <p id={fields.confirmPassword.errorId} className="text-red-600">
          {fields.confirmPassword.errors}
        </p>
      </div>

      <SubmitButton fieldAttributes={{ form: form.id }} text="Sign up" />
    </Form>
  );
}
