import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { Form, useActionData, useSearchParams } from '@remix-run/react';
import { AuthenticityTokenInput } from 'remix-utils/csrf/react';
import { HoneypotInputs } from 'remix-utils/honeypot/react';
import { FormErrors, FormFieldErrors, Hyperlink, InputText, Label, RememberMe, SubmitButton } from '~/components';
import { useIsPending } from '~/hooks';
import { action } from '~/routes/_auth.login';
import { LoginSchema } from '~/schemas';

const loginFormActionIntent = 'login';

export default function LoginForm() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const lastResult = useActionData<typeof action>();
  const isPending = useIsPending({ formIntent: loginFormActionIntent });

  const [form, fields] = useForm({
    id: 'login-form',
    lastResult,
    constraint: getZodConstraint(LoginSchema),
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onInput',
    defaultValue: {
      redirectTo,
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: LoginSchema });
    },
  });
  return (
    <Form method="POST" {...getFormProps(form)} className="space-y-6">
      <AuthenticityTokenInput />
      <HoneypotInputs />
      <input {...getInputProps(fields.redirectTo, { type: 'hidden' })} />
      <div className="flex flex-col gap-y-2">
        <Label htmlFor={fields.email.id} text="Email address" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.email, { type: 'email' }),
            autoFocus: true,
            autoComplete: 'off',
            placeholder: 'john.doe@email.com',
          }}
        />
        <FormFieldErrors field={fields.email} />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor={fields.password.id} text="Password" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.password, { type: 'password' }),
            autoComplete: 'off',
          }}
        />
        <FormFieldErrors field={fields.password} />
      </div>
      <div className="flex items-center justify-between pb-4">
        <RememberMe />
        <Hyperlink text="Forgot password?" to="/password/reset" />
      </div>
      <SubmitButton
        fieldAttributes={{ form: form.id, name: 'intent', value: loginFormActionIntent }}
        text="Log in"
        isPending={isPending}
        pendingText="Logging in..."
      />
      <FormErrors form={form} />
    </Form>
  );
}
