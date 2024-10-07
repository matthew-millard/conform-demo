import { prisma } from '~/.server/db';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');
  console.time('Seeded database...');

  console.time('Cleaning database...');
  await prisma.user.deleteMany();
  console.timeEnd('Cleaning database...');

  console.time('Created permissions...');
  const entities = ['user'];
  const actions = ['create', 'read', 'update', 'delete'];
  const accesses = ['own', 'any'];

  for (const entity of entities) {
    for (const action of actions) {
      for (const access of accesses) {
        await prisma.permission.create({
          data: {
            entity,
            action,
            access,
          },
        });
      }
    }
  }
  console.timeEnd('Created permissions...');

  console.time('Created roles...');
  await prisma.role.create({
    data: {
      name: 'admin',
      permissions: {
        connect: await prisma.permission.findMany({
          select: { id: true },
          where: { access: 'any' },
        }),
      },
    },
  });

  await prisma.role.create({
    data: {
      name: 'user',
      permissions: {
        connect: await prisma.permission.findMany({
          select: { id: true },
          where: { access: 'own' },
        }),
      },
    },
  });
  console.timeEnd('Created roles...');

  const totalUsers = 3;
  console.time(`Seeding ${totalUsers} users...`);
  const userData = [
    {
      firstName: 'Hamish',
      lastName: 'Millard',
      username: 'hamishmillard',
      email: 'hamish.millard@gmail.com',
      password: createPasswordHash('Password123!'),
    },
    {
      firstName: 'Finn',
      lastName: 'Millard',
      username: 'finnmillard',
      email: 'finn.millard@gmail.com',
      password: createPasswordHash('Password123!'),
    },
    {
      firstName: 'Islay',
      lastName: 'Millard',
      username: 'islaymillard',
      email: 'islay.millard@gmail.com',
      password: createPasswordHash('Password123!'),
    },
  ];

  for (let index = 0; index < totalUsers; index++) {
    await prisma.user
      .create({
        data: {
          firstName: userData[index].firstName,
          lastName: userData[index].lastName,
          username: userData[index].username,
          email: userData[index].email,
          password: {
            create: {
              hash: userData[index].password,
            },
          },
          roles: {
            connect: {
              name: 'user',
            },
          },
        },
      })
      .catch(error => {
        console.error('Error creating a user: ', error);
        return null;
      });
  }

  console.timeEnd(`Seeding ${totalUsers} users...`);

  console.time(`Created admin user Matt`);
  await prisma.user
    .create({
      data: {
        firstName: 'Matt',
        lastName: 'Millard',
        username: 'mattmillard',
        email: 'matt.millard@gmail.com',
        password: {
          create: {
            hash: createPasswordHash('Password123!'),
          },
        },
        roles: {
          connect: [
            {
              name: 'admin',
            },
            { name: 'user' },
          ],
        },
      },
    })
    .catch(error => {
      console.error('Error creating a admin: ', error);
      return null;
    });
  console.timeEnd(`Created admin user Matt`);

  console.timeEnd('Seeded database...');
  console.log('Database seeded!');
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

function createPasswordHash(password: string) {
  return bcrypt.hashSync(password, 10);
}
