import { getFormProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useFetcher } from '@remix-run/react';
import { AuthenticityTokenInput } from 'remix-utils/csrf/react';
import { HoneypotInputs } from 'remix-utils/honeypot/react';
import { action, updateThemeActionIntent } from '~/root';
import { ThemeSwitcherSchema } from '~/schemas';
import { Icon } from '../components';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export type Theme = 'light' | 'dark';
export const fetcherKey = 'update-theme';

export default function ThemeSwitcher({ userPreference }: { userPreference: Theme }) {
  const fetcher = useFetcher<typeof action>({ key: fetcherKey });

  const [form] = useForm({
    id: 'theme-switcher',
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ThemeSwitcherSchema });
    },
  });

  const mode = userPreference ?? 'light';
  const nextMode = mode === 'light' ? 'dark' : 'light';

  return (
    <fetcher.Form method="POST" action="/" {...getFormProps(form)} className="flex items-center">
      <AuthenticityTokenInput />
      <HoneypotInputs />
      <input type="hidden" name="theme" value={nextMode} />
      <button type="submit" name="intent" value={updateThemeActionIntent}>
        {mode === 'light' ? (
          <Icon>
            <SunIcon className="h-5 w-5" />
            <span className="sr-only">Light</span>
          </Icon>
        ) : (
          <Icon>
            <MoonIcon className="h-5 w-5" />
            <span className="sr-only">Dark</span>
          </Icon>
        )}
      </button>
    </fetcher.Form>
  );
}
