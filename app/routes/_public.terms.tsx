import { LoaderFunctionArgs } from '@remix-run/node';
import { requireUserId } from '~/.server/auth';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);
  return {};
}

export default function TermsOfServiceRoute() {
  return <h1 className="text-on-surface">Terms of Service</h1>;
}
