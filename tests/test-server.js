import {Server} from "../src/Server.js";
import {envsPlugin} from "../src/config/plugins/envs.plugin.js";
import {AppRouter} from "../src/routes/v1/app.routes.js";

export const testServer = new Server({
  port: envsPlugin.PORT,
  routes: AppRouter.routes,
  acceptedOrigins: [],
});