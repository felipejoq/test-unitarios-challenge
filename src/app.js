import express from 'express';
import { envsPlugin } from './config/plugins/envs.plugin.js';
import { AppRouter } from './routes/v1/app.routes.js';
import { Server } from './Server.js';

// Servidor de Express.
//const app = express();

// Función de arranque.
const main = async () => {
  const server = new Server({
    port: envsPlugin.PORT,
    routes: AppRouter.routes,
    acceptedOrigins: [],
  });

  await server.start();
}

// Inicialización.
(async () => {
  await main();
})();