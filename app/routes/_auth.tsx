import { Outlet } from '@remix-run/react';

export default function AuthLayout() {
  return (
    <div>
      <main className="flex min-h-dvh items-center">
        <Outlet />
      </main>
    </div>
  );
}
