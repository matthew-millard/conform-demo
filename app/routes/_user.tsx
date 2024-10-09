import { Outlet } from '@remix-run/react';
import { Header } from '~/components';

export default function UserLayoutRoute() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <main className="relative -mb-8 -mt-[5.75rem] overflow-hidden pb-8 pt-[5.75rem]">
        <Outlet />
      </main>
    </div>
  );
}
