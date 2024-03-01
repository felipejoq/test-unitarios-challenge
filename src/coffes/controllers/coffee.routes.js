import { Router } from "express";
import {CoffeeController} from "./coffee.controller.js";
import {CoffeeService} from "../services/coffee.service.js";
import {DataService} from "../../common/services/data.service.js";

export class CoffeeRoutes {

  static get routes() {

    const coffeeRouter = Router();

    const dataService = new DataService()
    const coffeeService = new CoffeeService(dataService)
    const coffeeController = new CoffeeController(coffeeService)

    coffeeRouter.get('/', coffeeController.getCoffees);
    coffeeRouter.post('/', coffeeController.createCoffee);
    coffeeRouter.put('/:coffeeId', coffeeController.updateCoffeeById);
    coffeeRouter.get('/:coffeeId', coffeeController.getCoffeById);
    coffeeRouter.delete('/:coffeeId', coffeeController.deleteCoffeById);

    return coffeeRouter;
  }

}