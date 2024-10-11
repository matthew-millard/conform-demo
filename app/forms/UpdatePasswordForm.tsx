import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { Form, useActionData } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { FormErrors, FormFieldErrors, InputText, Label, OutlineButton } from '~/components';
import { useIsPending } from '~/hooks';
import { action, updatePasswordActionIntent } from '~/routes/_user.$username_.settings';
import { UpdatePasswordSchema } from '~/schemas';

export default function UpdatePasswordForm() {
  const lastResult = useActionData<typeof action>();
  const lastResultPassword = lastResult?.initialValue?.intent === updatePasswordActionIntent ? lastResult : null;

  const formRef = useRef<HTMLFormElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (lastResultPassword?.status === 'success') {
      formRef.current?.reset();
      currentPasswordRef.current?.focus();
    }
  }, [lastResultPassword]);

  const [form, fields] = useForm({
    id: 'update-password-form',
    lastResult: lastResultPassword,
    constraint: getZodConstraint(UpdatePasswordSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: UpdatePasswordSchema,
      });
    },
  });

  return (
    <Form method="POST" className="mt-8" {...getFormProps(form)} preventScrollReset ref={formRef}>
      <div className="flex flex-col gap-y-2 mt-3 sm:mt-6">
        <Label htmlFor={fields.currentPassword.id} text="Current password" />
        <InputText
          ref={currentPasswordRef}
          fieldAttributes={{
            ...getInputProps(fields.currentPassword, { type: 'password' }),
          }}
        />
        <FormFieldErrors field={fields.currentPassword} />
      </div>
      <div className="flex flex-col gap-y-2 mt-3 sm:mt-6">
        <Label htmlFor={fields.newPassword.id} text="New password" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.newPassword, { type: 'password' }),
          }}
        />
        <FormFieldErrors field={fields.newPassword} />
      </div>
      <div className="flex flex-col gap-y-2 mt-3 sm:mt-6">
        <Label htmlFor={fields.confirmPassword.id} text="Confirm password" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.confirmPassword, { type: 'password' }),
          }}
        />
        <FormFieldErrors field={fields.confirmPassword} />
      </div>
      <div className="mt-6">
        <OutlineButton
          type="submit"
          text="Update"
          name="intent"
          value={updatePasswordActionIntent}
          isPending={useIsPending({ formIntent: updatePasswordActionIntent })}
          pendingText="Updating..."
        />
      </div>
      <div className="mt-3">
        <FormErrors errorId={form.errorId} errors={form.errors} />
      </div>
    </Form>
  );
}
