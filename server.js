import { createRequestHandler } from '@remix-run/express';
import express from 'express';

const viteDevServer =
  process.env.NODE_ENV === 'production'
    ? null
    : await import('vite').then(vite =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

const app = express();
app.use(viteDevServer ? viteDevServer.middlewares : express.static('build/client'));

const build = viteDevServer
  ? () => viteDevServer.ssrLoadModule('virtual:remix/server-build')
  : await import('./build/server/index.js');

app.all('*', createRequestHandler({ build }));

app.listen(3000, () => {
  console.log(`
    ----------------------------------------
    We have takeoff 🚀 
    App is live at: http://localhost:3000 🌐
    Ready to handle request! 🤘
    ----------------------------------------
    `);
});
