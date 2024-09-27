import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import LinkButton from './LinkButton';

type ErrorLayoutProps = {
  status?: number;
  title: string;
  message: string | null;
};

export default function RootErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <ErrorLayout status={error.status} title={error.statusText} message={error.data} />;
  } else if (error instanceof Error) {
    return <ErrorLayout title={error.name} message={error.message} />;
  } else {
    return <ErrorLayout title="Unknown Error" message={null} />;
  }
}

function ErrorLayout({ status, title, message }: ErrorLayoutProps) {
  return (
    <main className="grid min-h-full place-items-center bg-zinc-950 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="font-semibold text-primary-color">{status && status}</p>
        <h1 className="mt-4 font-bold text-zinc-50">{title}</h1>
        <p className="mt-6 leading-7 text-text-color-muted-extra">
          {message ? message : 'Sorry, an unexpected error has occured.'}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <LinkButton to="/" prefetch="intent">
            <span>← Go back home</span>
          </LinkButton>
        </div>
      </div>
    </main>
  );
}
