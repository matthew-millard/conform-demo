import { GenericErrorBoundary } from '~/components';

export async function loader() {
  throw new Response("Sorry, we could't find the page you're looking for. ", {
    status: 404,
    statusText: 'Page not found',
  });
}

export default function SplatRoute() {
  return <GenericErrorBoundary />;
}
