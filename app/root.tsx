import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import styles from '~/tailwind.css?url';
import honeypot from './.server/honeypot';
import { HoneypotProvider } from 'remix-utils/honeypot/react';

export const links = () => {
  return [{ rel: 'stylesheet', href: styles, as: 'style' }];
};

export async function loader() {
  const data = {
    honeypotInputProps: honeypot.getInputProps(),
  };
  return json(data);
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
  const { honeypotInputProps } = useLoaderData<typeof loader>();
  return (
    <HoneypotProvider {...honeypotInputProps}>
      <Outlet />
    </HoneypotProvider>
  );
}
