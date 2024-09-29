import { MetaFunction } from '@remix-run/node';
import { useOutletContext } from '@remix-run/react';
import { Header } from '~/components';
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
      <Header theme={theme} />
    </div>
  );
}
