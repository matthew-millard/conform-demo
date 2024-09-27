import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { json, LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import styles from '~/tailwind.css?url';
import honeypot, { checkHoneypot } from './.server/honeypot';
import { HoneypotProvider } from 'remix-utils/honeypot/react';
import { checkCSRF, csrf } from '~/.server/csrf';
import { AuthenticityTokenProvider } from 'remix-utils/csrf/react';
import { getThemeFromCookie, updateTheme } from './.server/theme';
import { Theme } from './components/ThemeSwitcher';
import { useTheme } from './hooks';
import { getUserId } from './.server/auth';
import { getUserData } from './.server/utils';
import { GenericErrorBoundary } from './components';

export const updateThemeActionIntent = 'update-theme';

export type ContextType = {
  theme: Theme;
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles, as: 'style' }];
};

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  await checkCSRF(formData, request.headers);
  checkHoneypot(formData);

  const intent = formData.get('intent') as string;

  switch (intent) {
    case updateThemeActionIntent:
      return updateTheme(formData);
    default:
      return json({ status: 'error', message: 'Invalid intent' }, { status: 400 });
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const [csrfToken, csrfCookieHeader] = await csrf.commitToken(request);
  const theme = getThemeFromCookie(request);
  const userId = await getUserId(request);

  const user = userId ? await getUserData(userId) : null;

  const data = {
    csrfToken,
    honeypotInputProps: honeypot.getInputProps(),
    theme: theme as Theme,
    user,
  };

  return json(data, {
    headers: csrfCookieHeader
      ? {
          'set-cookie': csrfCookieHeader,
        }
      : undefined,
  });
}

function App() {
  const theme = useTheme();
  return (
    <Document>
      <Outlet context={{ theme }} />
    </Document>
  );
}

function Document({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <html lang="en" className={`${theme} h-full`}>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-app-background-color text-text-color h-full">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const { honeypotInputProps, csrfToken } = useLoaderData<typeof loader>();
  return (
    <AuthenticityTokenProvider token={csrfToken}>
      <HoneypotProvider {...honeypotInputProps}>
        <App />
      </HoneypotProvider>
    </AuthenticityTokenProvider>
  );
}

export function ErrorBoundary() {
  return (
    <Document>
      <GenericErrorBoundary />
    </Document>
  );
}
