import { useOutletContext } from '@remix-run/react';
import { Header } from '~/components';
import { ContextType } from '~/root';

export default function IndexRoute() {
  const { theme } = useOutletContext<ContextType>();

  return (
    <div>
      <Header theme={theme} />
    </div>
  );
}
