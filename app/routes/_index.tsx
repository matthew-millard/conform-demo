import { useOutletContext } from '@remix-run/react';
import { ThemeSwitcher } from '~/components';
import { ContextType } from '~/root';

export default function IndexRoute() {
  const { theme } = useOutletContext<ContextType>();

  return (
    <div>
      <h1 className="text-white">Index Route</h1>
      <ThemeSwitcher userPreference={theme} />
    </div>
  );
}
