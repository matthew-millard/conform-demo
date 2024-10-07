import { Outlet } from '@remix-run/react';

export default function UserProfileRoute() {
  return (
    <div>
      <h1 className="text-on-surface">Profile</h1>
      <Outlet />
    </div>
  );
}
