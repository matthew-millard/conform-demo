import { getFormProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useFetcher } from '@remix-run/react';
import { AuthenticityTokenInput } from 'remix-utils/csrf/react';
import { HoneypotInputs } from 'remix-utils/honeypot/react';
import { action, updateThemeActionIntent } from '~/root';
import { ThemeSwitcherSchema } from '~/schemas';

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
    <fetcher.Form method="POST" action="/" {...getFormProps(form)}>
      <AuthenticityTokenInput />
      <HoneypotInputs />
      <input type="hidden" name="theme" value={nextMode} />
      <button type="submit" name="intent" value={updateThemeActionIntent} className="text-white">
        {mode === 'light' ? (
          <span className="text-text-color-muted">
            <SunIcon />
            <span className="sr-only">Light</span>
          </span>
        ) : (
          <span className="text-text-color-muted">
            <MoonIcon />
            <span className="sr-only">Dark</span>
          </span>
        )}
      </button>
    </fetcher.Form>
  );
}
