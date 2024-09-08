import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import styles from '~/tailwind.css?url';

export const links = () => {
  return [{ rel: 'stylesheet', href: styles, as: 'style' }];
};

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
  return <Outlet />;
}
