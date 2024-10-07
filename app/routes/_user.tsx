import { Outlet } from '@remix-run/react';
import { Header } from '~/components';

export default function UserLayoutRoute() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <main className="px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
