import { Outlet } from '@remix-run/react';
import { ThemeSwitcher } from '~/components';

export default function PublicLayout() {
  return (
    <div>
      <h1 className="text-on-surface">Public Layout</h1>
      <ThemeSwitcher />
      <Outlet />
    </div>
  );
}
