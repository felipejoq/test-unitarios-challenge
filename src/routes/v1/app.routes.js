import { Router } from "express";
import {CoffeeRoutes} from "../../coffes/controllers/coffee.routes.js";

export class AppRouter {

  static get routes() {
    const AppRouter = Router();

    AppRouter.use("/api/v1/coffee", CoffeeRoutes.routes);

    return AppRouter;
  }

}