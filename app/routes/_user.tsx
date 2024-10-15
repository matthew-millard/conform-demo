import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { Breadcrumb, Header } from '~/components';

export const handle = {
  breadcrumb: ({ params }: LoaderFunctionArgs) => {
    return <Breadcrumb name={params.username} to={params.username} />;
  },
};

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
