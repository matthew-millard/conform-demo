import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import styles from '~/tailwind.css?url';

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1 className="text-3xl font-bold">Hello World!</h1>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
