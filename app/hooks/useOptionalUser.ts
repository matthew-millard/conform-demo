import { useRouteLoaderData } from '@remix-run/react';
import { loader } from '~/root';

export function useOptionalUser() {
  const data = useRouteLoaderData<typeof loader>('root');
  const user = data?.userId;
  return user || null;
}
