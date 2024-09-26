import { PrismaClient } from '@prisma/client';
import { singleton } from './singleton';
import chalk from 'chalk';

export const prisma = singleton('prisma', () => {
  const logThreshold = 20;
  const client = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  });

  client.$on('query', async e => {
    if (e.duration < logThreshold) return;
    const color =
      e.duration < logThreshold * 1.1
        ? 'green'
        : e.duration < logThreshold * 1.2
          ? 'blue'
          : e.duration < logThreshold * 1.3
            ? 'yellow'
            : e.duration < logThreshold * 1.4
              ? 'redBright'
              : 'red';
    const dur = chalk[color](`${e.duration}ms`);
    console.info(`prisma:query - ${dur} - ${e.query}`);
  });

  client.$connect();
  return client;
});
