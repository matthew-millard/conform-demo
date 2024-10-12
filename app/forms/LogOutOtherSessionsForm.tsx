import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { Form, useActionData } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { FormErrors, FormFieldErrors, InputText, Label, OutlineButton } from '~/components';
import { useIsPending } from '~/hooks';
import { action, logOutOfOtherSessionsActionIntent } from '~/routes/_user.$username_.settings';
import { LogOutOfOtherSessionsSchema } from '~/schemas/auth';

export default function LogOutOfOtherSessionsForm() {
  const lastResult = useActionData<typeof action>();
  const lastResultLogOutOfSessions =
    lastResult?.initialValue?.intent === logOutOfOtherSessionsActionIntent ? lastResult : null;

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (lastResultLogOutOfSessions?.status === 'success') {
      formRef.current?.reset();
    }
  }, [lastResultLogOutOfSessions]);

  const [form, fields] = useForm({
    id: 'log-out-of-other-sessions-form',
    lastResult: lastResultLogOutOfSessions,
    constraint: getZodConstraint(LogOutOfOtherSessionsSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: LogOutOfOtherSessionsSchema,
      });
    },
  });

  return (
    <Form method="POST" className="mt-8" preventScrollReset {...getFormProps(form)} ref={formRef}>
      <div className="flex flex-col gap-y-2 mt-3 sm:mt-6">
        <Label htmlFor={fields.password.id} text="Password" />
        <InputText
          fieldAttributes={{
            ...getInputProps(fields.password, { type: 'password' }),
          }}
        />
        <FormFieldErrors field={fields.password} />
      </div>
      <div className="mt-6">
        <OutlineButton
          type="submit"
          text="Log out of other sessions"
          name="intent"
          value={logOutOfOtherSessionsActionIntent}
          isPending={useIsPending({ formIntent: logOutOfOtherSessionsActionIntent })}
          pendingText="Logging out..."
        />
      </div>
      <div className="mt-3">
        <FormErrors errorId={form.errorId} errors={form.errors} />
      </div>
    </Form>
  );
}
