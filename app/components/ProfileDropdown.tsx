import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import PlaceholderIcon from './PlaceholderIcon';
import LogoutForm from './LogoutForm';

type ProfileDropdownProps = {
  userNavigation: { name: string; description: string; path: string; icon: any }[];
  username: string;
};

export default function ProfileDropdown({ userNavigation, username }: ProfileDropdownProps) {
  return (
    <Menu as="div" className="relative">
      <div>
        <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="h-8 w-8 rounded-full"
          />
          {/* <PlaceholderIcon /> */}
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-surface py-1 shadow-lg ring-1 ring-around-surface transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {userNavigation.map(item => {
          return (
            <MenuItem key={item.name}>
              <a
                href={`/${username}${item.path}`}
                className="py-2.5 px-4 text-on-surface data-[focus]:bg-on-surface-hover flex items-center rounded-md hover:bg-on-surface-hover"
              >
                <item.icon aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-primary" />
                <span className="ml-3 text-on-surface">{item.name}</span>
              </a>
            </MenuItem>
          );
        })}
        <MenuItem>
          <div className="px-4 py-2.5 hover:bg-on-surface-hover bg-surface">
            <LogoutForm />
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
