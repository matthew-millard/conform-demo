import { action } from '~/routes/_auth.signup';
import { Form, useActionData } from '@remix-run/react';
import { FormErrors, FormFieldErrors, InputText, Label, SubmitButton } from '~/components';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { SignupSchema } from '~/schemas';
import { HoneypotInputs } from 'remix-utils/honeypot/react';
import { AuthenticityTokenInput } from 'remix-utils/csrf/react';
import { useIsPending } from '~/hooks';

const signupFormActionIntent = 'sign up';

export default function SignupForm() {
  const lastResult = useActionData<typeof action>();
  const isPending = useIsPending({ formIntent: signupFormActionIntent });

  const [form, fields] = useForm({
    id: 'sign-up-form',
    lastResult,
    constraint: getZodConstraint(SignupSchema),
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onInput',
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SignupSchema });
    },
  });

  return (
    <Form method="POST" {...getFormProps(form)} className="space-y-3">
      <AuthenticityTokenInput />
      <HoneypotInputs />
      <div className="flex flex-col gap-y-2">
        <Label
          htmlFor={fields.firstName.id}
          text="First name"
          classNames="block text-sm font-medium leading-6 text-zinc-50"
        />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.firstName, { type: 'text' }),
            autoFocus: true,
            autoComplete: 'off',
            required: true,
          }}
        />
        <FormFieldErrors field={fields.firstName} />
      </div>

      <div className="flex flex-col gap-y-2">
        <Label
          htmlFor={fields.lastName.id}
          text="Last name"
          classNames="block text-sm font-medium leading-6 text-zinc-50"
        />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.lastName, { type: 'text' }),
            autoComplete: 'off',
            required: true,
          }}
        />
        <FormFieldErrors field={fields.lastName} />
      </div>

      <div className="flex flex-col gap-y-2">
        <Label
          htmlFor={fields.username.id}
          text="Username"
          classNames="block text-sm font-medium leading-6 text-zinc-50"
        />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.username, { type: 'text' }),
            autoComplete: 'off',
            required: true,
          }}
        />
        <FormFieldErrors field={fields.username} />
      </div>

      <div className="flex flex-col gap-y-2">
        <Label
          htmlFor={fields.email.id}
          text="Email address"
          classNames="block text-sm font-medium leading-6 text-zinc-50"
        />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.email, { type: 'email' }),
            autoComplete: 'off',
            required: true,
          }}
        />
        <FormFieldErrors field={fields.email} />
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor="password" text="Password" classNames="block text-sm font-medium leading-6 text-zinc-50" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.password, { type: 'password' }),
            autoComplete: 'off',
            required: true,
          }}
        />
        <FormFieldErrors field={fields.password} />
      </div>

      <div className="flex flex-col gap-y-2">
        <Label
          htmlFor="confirm-password"
          text="Confirm password"
          classNames="block text-sm font-medium leading-6 text-zinc-50"
        />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.confirmPassword, { type: 'password' }),
            autoComplete: 'off',
            required: true,
          }}
        />
        <FormFieldErrors field={fields.confirmPassword} />
      </div>

      <SubmitButton
        fieldAttributes={{ form: form.id, name: 'intent', value: signupFormActionIntent }}
        text="Sign up"
        isPending={isPending}
        pendingText="Signing up..."
      />
      <FormErrors form={form} />
    </Form>
  );
}
