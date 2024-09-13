import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import styles from '~/tailwind.css?url';
import honeypot from './.server/honeypot';
import { HoneypotProvider } from 'remix-utils/honeypot/react';
import { csrf } from '~/.server/csrf';
import { AuthenticityTokenProvider } from 'remix-utils/csrf/react';

export const links = () => {
  return [{ rel: 'stylesheet', href: styles, as: 'style' }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const [csrfToken, csrfCookieHeader] = await csrf.commitToken(request);

  const data = {
    csrfToken,
    honeypotInputProps: honeypot.getInputProps(),
  };

  return json(data, {
    headers: csrfCookieHeader
      ? {
          'set-cookie': csrfCookieHeader,
        }
      : undefined,
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-zinc-900">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { honeypotInputProps, csrfToken } = useLoaderData<typeof loader>();
  return (
    <AuthenticityTokenProvider token={csrfToken}>
      <HoneypotProvider {...honeypotInputProps}>
        <Outlet />
      </HoneypotProvider>
    </AuthenticityTokenProvider>
  );
}
