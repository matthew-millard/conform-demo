import { MetaFunction } from '@remix-run/node';
import { useOutletContext } from '@remix-run/react';
import { Header } from '~/components';
import { ContextType } from '~/root';

export const meta: MetaFunction = () => {
  return [
    { title: 'Conform Demo' },
    {
      name: 'description',
      content:
        'A demonstration project showcasing form validation and error handling using the Conform library in a Remix application.',
    },
    { property: 'og:title', content: 'Conform Demo' },
    {
      property: 'og:description',
      content:
        'A demonstration project showcasing form validation and error handling using the Conform library in a Remix application.',
    },
    { property: 'og:url', content: 'https://conformdemo.run' },
  ];
};

export default function IndexRoute() {
  const { theme } = useOutletContext<ContextType>();

  return (
    <div>
      <Header theme={theme} />
    </div>
  );
}
