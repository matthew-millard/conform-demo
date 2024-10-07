import { json } from '@remix-run/node';
import { requireUserId } from '../.server/auth';
import { prisma } from '../.server/db';
import { useUser } from '~/hooks/useUser';

type Action = 'create' | 'read' | 'update' | 'delete';
type Entity = 'user';
type Access = 'own' | 'any' | 'own,any' | 'any,own';

type PermissionString = `${Action}:${Entity}` | `${Action}:${Entity}:${Access}`;

function parsePermissionString(permissionString: PermissionString) {
  const [action, entity, access] = permissionString.split(':') as [Action, Entity, Access | undefined];

  return {
    action,
    entity,
    access: access ? (access.split(',') as Access[]) : undefined,
  };
}

// Does this user have at least one role where at least one of its permissions matches the given criteria?
export async function requireUserWithPermission(request: Request, permission: PermissionString) {
  const userId = await requireUserId(request);
  const permissionData = parsePermissionString(permission);
  const user = await prisma.user.findFirst({
    select: { id: true },
    where: {
      id: userId,
      roles: {
        some: {
          permissions: {
            some: {
              ...permissionData,
              access: permissionData.access
                ? {
                    in: permissionData.access,
                  }
                : undefined,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw json(
      {
        error: 'Unauthorized',
        requiredPermission: permissionData,
        message: `Unauthorized: required permissions: ${permission}`,
      },
      { status: 403 }
    );
  }
  return user.id;
}

// Does this user have a role with the given name?
export async function requireUserWithRole(request: Request, name: string) {
  const userId = await requireUserId(request);
  const user = await prisma.user.findFirst({
    select: { id: true },
    where: { id: userId, roles: { some: { name } } },
  });
  if (!user) {
    throw json(
      {
        error: 'Unauthorized',
        requiredRole: name,
        message: `Unauthorized: required role: ${name}`,
      },
      { status: 403 }
    );
  }
  return user.id;
}

export function userHasPermission(
  user: Pick<ReturnType<typeof useUser>, 'roles'> | null,
  permission: PermissionString
) {
  if (!user) return false;
  const { action, entity, access } = parsePermissionString(permission);

  return user.roles.some(role =>
    role.permissions.some(
      permission =>
        permission.entity === entity && permission.action === action && (!access || access.includes(permission.access))
    )
  );
}

export function userHasRole(user: Pick<ReturnType<typeof useUser>, 'roles'> | null, role: string) {
  if (!user) return false;

  return user.roles.some(r => r.name === role);
}
