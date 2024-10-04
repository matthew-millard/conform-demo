import { action, loader } from '~/routes/_auth.signup';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { FormErrors, FormFieldErrors, InputText, Label, SubmitButton } from '~/components';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { SignupSchema } from '~/schemas';
import { HoneypotInputs } from 'remix-utils/honeypot/react';
import { AuthenticityTokenInput } from 'remix-utils/csrf/react';
import { useIsPending } from '~/hooks';

const signupFormActionIntent = 'sign up';

export default function SignupForm() {
  const { redirectTo } = useLoaderData<typeof loader>();
  const lastResult = useActionData<typeof action>();
  const isPending = useIsPending({ formIntent: signupFormActionIntent });

  const [form, fields] = useForm({
    id: 'sign-up-form',
    lastResult,
    constraint: getZodConstraint(SignupSchema),
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onInput',
    defaultValue: {
      redirectTo,
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SignupSchema });
    },
  });

  return (
    <Form method="POST" {...getFormProps(form)} className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <AuthenticityTokenInput />
      <HoneypotInputs />
      <input {...getInputProps(fields.redirectTo, { type: 'hidden' })} />
      <div className="flex flex-col gap-y-2">
        <Label htmlFor={fields.firstName.id} text="First name" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.firstName, { type: 'text' }),
            autoFocus: true,
            autoComplete: 'off',
            required: true,
            placeholder: 'John',
          }}
        />
        <FormFieldErrors field={fields.firstName} />
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor={fields.lastName.id} text="Last name" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.lastName, { type: 'text' }),
            autoComplete: 'off',
            required: true,
            placeholder: 'Doe',
          }}
        />
        <FormFieldErrors field={fields.lastName} />
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor={fields.username.id} text="Username" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.username, { type: 'text' }),
            autoComplete: 'off',
            required: true,
            placeholder: 'johndoe',
          }}
        />
        <FormFieldErrors field={fields.username} />
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor={fields.email.id} text="Email address" />
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
        <Label htmlFor="password" text="Password" />
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
        <Label htmlFor="confirm-password" text="Confirm password" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.confirmPassword, { type: 'password' }),
            autoComplete: 'off',
            required: true,
          }}
        />
        <FormFieldErrors field={fields.confirmPassword} />
      </div>

      <div className="sm:col-span-2">
        <SubmitButton
          fieldAttributes={{ form: form.id, name: 'intent', value: signupFormActionIntent }}
          text="Sign up"
          isPending={isPending}
          pendingText="Signing up..."
        />
      </div>
      <FormErrors form={form} />
    </Form>
  );
}
