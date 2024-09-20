import { Popover, PopoverPanel } from '@headlessui/react';
import { Bars3Icon, Cog6ToothIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import { LinkButton, LinkWithPrefetch, MenuToggle, PreTextWithLink, ThemeSwitcher } from '../components';
import { Theme } from './ThemeSwitcher';
import { Link } from '@remix-run/react';

const links = [
  {
    name: 'Profile',
    description: 'Your profile information.',
    href: '/profile',
    icon: UserCircleIcon,
  },
  {
    name: 'Account settings',
    description: 'Your account settings.',
    href: 'settings',
    icon: Cog6ToothIcon,
  },
];

export default function Header({ theme }: { theme: Theme }) {
  return (
    <Popover className="relative">
      <div className="mx-auto px-6 bg-header-background-color">
        <div className="flex items-center justify-between border-b border-border-color py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Logo />
          </div>

          <div className="-my-2 md:hidden">
            <MenuToggle>
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </MenuToggle>
          </div>

          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <ThemeSwitcher userPreference={theme} />
            <LinkWithPrefetch />
            <LinkButton to="/signup" prefetch="intent">
              <span>Sign up</span>
            </LinkButton>
          </div>
        </div>
      </div>

      <PopoverPanel
        transition
        className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in md:hidden"
      >
        <div className="divide-y divide-border-color rounded-lg bg-popover-panel-background-color shadow-lg ring-1 ring-border-color">
          <div className="px-5 pb-6 pt-5">
            <div className="flex items-center justify-between">
              <Logo />
              <div className="-mr-2">
                <MenuToggle>
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </MenuToggle>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                {links.map(item => (
                  <a key={item.name} href={item.href} className="-m-3 flex items-center rounded-md p-3 ">
                    <item.icon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-icon-color-primary hover:text-icon-color-primary-hover active:text-icon-color-primary-active"
                    />
                    <span className="ml-3 text-base font-medium text-link-text-color hover:text-link-text-color-hover active:text-link-text-color-active">
                      {item.name}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="space-y-6 px-5 py-6 min-h-96 flex flex-col justify-end">
            <div>
              <Link
                to="/signup"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-button-primary-color hover:bg-button-primary-color-hover active:bg-button-primary-color-active px-4 py-2 text-base font-medium text-button-primary-text-color shadow-sm"
              >
                Sign up
              </Link>
              <PreTextWithLink preText="Already have an account?" to="/login" text="Log in" />
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
