import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { z } from 'zod';
import { requireUser } from '~/.server/auth';
import { FormFieldErrors, InputText, Label, OutlineButton } from '~/components';
import { UsernameSchema } from '~/schemas';
import { invariantResponse } from '~/utils/misc';

const updateUsernameActionIntent = 'update-username';

export async function action({ request }: ActionFunctionArgs) {
  const { id, username } = await requireUser(request);
  console.log(`User ID: ${id}, Username: ${username}`);
  const formData = await request.formData();
  const intent = formData.get('intent');
  console.log('formData: ', formData);
  console.log('intent: ', intent);
  return {};
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { id, username } = await requireUser(request);
  invariantResponse(username === params.username, "Sorry, we could't find the page you're looking for.", {
    status: 404,
    statusText: 'Page not found.',
  });

  return { id, username };
}

export default function UserAccountSettingsRoute() {
  const { username } = useLoaderData<typeof loader>();
  const lastResult = useActionData<typeof action>();
  // Update username form
  const [updateUsernameForm, updateUsernameFields] = useForm({
    id: 'update-username-form',
    lastResult,
    constraint: getZodConstraint(z.object({ username: z.string().min(3).max(20) })),
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onInput',
    defaultValue: {
      username,
    },
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: z.object({ username: UsernameSchema }),
      });
    },
  });

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-24">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface sm:text-5xl">Account Settings</h1>
          <p className="mt-4 text-base leading-7 text-on-surface-variant">
            Manage your account details, security settings, and preferences.
          </p>
        </div>
      </div>
      <div className="relative mx-auto max-w-[40rem] space-y-16 divide-y divide-slate-100">
        <section className="px-4 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center">
              <UserCircleIcon className="w-8 h-8 flex-none text-primary" />
              <h2 className="ml-4 text-lg font-semibold leading-7 text-on-surface">Username</h2>
            </div>
            <p className="mt-3 max-w-none text-sm leading-6 text-on-surface-variant">
              Update your username associated with you account.
            </p>
          </div>
          <Form method="POST" className="mt-8" {...getFormProps(updateUsernameForm)}>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor={updateUsernameFields.username.id} text="Username" />
              <InputText
                fieldAttributes={{
                  ...getInputProps(updateUsernameFields.username, { type: 'text' }),
                }}
              />
              <FormFieldErrors field={updateUsernameFields.username} />
            </div>
            <div className="mt-6">
              <OutlineButton type="submit" text="Update" name="intent" value={updateUsernameActionIntent} />
            </div>
          </Form>
        </section>
      </div>
    </>
  );
}
