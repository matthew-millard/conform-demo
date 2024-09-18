import { Outlet, useOutletContext } from '@remix-run/react';
import { ThemeSwitcher } from '~/components';
import { ContextType } from '~/root';

export default function PublicLayout() {
  const { theme } = useOutletContext<ContextType>();
  return (
    <div>
      <h1 className="text-white">Public Layout</h1>
      <ThemeSwitcher userPreference={theme} />
      <Outlet />
    </div>
  );
}
