import { MetaFunction } from '@remix-run/node';
import { useOutletContext } from '@remix-run/react';
import { Header, LinkButton } from '~/components';
import { ContextType } from '~/root';

export const meta: MetaFunction = () => {
  return [
    { title: 'Hospo Hub' },
    {
      name: 'description',
      content:
        'Hospo Hub is the go-to professional networking platform for hospitality workers. Connect with industry peers, showcase your experience, and discover new opportunities in the hospitality sector.',
    },
    { property: 'og:title', content: 'Hospo Hub' },
    {
      property: 'og:description',
      content:
        'Hospo Hub is the go-to professional networking platform for hospitality workers. Connect with industry peers, showcase your experience, and discover new opportunities in the hospitality sector.',
    },
    { property: 'og:url', content: 'https://Hospohub.com' },
  ];
};

export default function IndexRoute() {
  const { theme } = useOutletContext<ContextType>();

  return (
    <div>
      <div>
        <Header theme={theme} />
      </div>

      <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-48 px-4">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-on-surface sm:text-6xl">
            Expand your network in the hospitality industry on Hospo Hub.
          </h1>
          <p className="mt-6 text-lg leading-8 text-on-surface-variant">
            Hospo Hub is a free networking platform for hospitality workers. Connect with industry peers, showcase your
            experience, and discover new opportunities in the hospitality sector.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <LinkButton to="/signup" prefetch="intent">
              Join our community
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
