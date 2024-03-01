import { handleError } from "../../config/errors/handler.error.js";
import {CreateCoffeeDto} from "../models/dtos/create-coffee.dto.js";
import {isUUID} from "../../config/plugins/uuid.plugin.js";
import {CustomError} from "../../config/errors/custom.errors.js";

export class CoffeeController {
  constructor(coffeeService) {
    this.coffeeService = coffeeService;
  }

  getCoffees = (req, res) => {
    this.coffeeService.getCoffees()
      .then(coffees => res.json(coffees))
      .catch(error => handleError(error, res));
  }

  getCoffeById = (req, res) => {
    const { coffeeId } = req.params;

    if (!isUUID(coffeeId))
      return res.status(400).json({ error: 'El id no es un UUID válido' });

    this.coffeeService.getCoffeeById({ coffeeId })
      .then(coffee => res.json(coffee))
      .catch(error => handleError(error, res));
  }

  createCoffee = (req, res) => {
    const { id, name, ingredients } = req.body;

    const [error, createCoffeeDto] = CreateCoffeeDto.create({ id, name, ingredients });

    if (error) return res.status(400).json({ error });

    return this.coffeeService.createCoffee(createCoffeeDto)
      .then(coffee => res.status(201).json(coffee))
      .catch(error => handleError(error, res));
  }

  updateCoffeeById = (req, res) => {

    const { coffeeId } = req.params;
    const { id, name, ingredients } = req.body;

    if (coffeeId !== id)
      return handleError(CustomError.badRequest('El id de la url no coincide con la del payload'), res);

    if (!isUUID(coffeeId))
      return res.status(400).json({ error: 'El id no es un UUID válido' });


    const [error, updateCoffeeDto] = CreateCoffeeDto.create({ id: coffeeId, name, ingredients });

    if (error) return res.status(400).json({ error });

    return this.coffeeService.updateCoffeeById({updateCoffeeDto})
      .then(coffees => res.json(coffees))
      .catch(error => handleError(error, res));
  }

  deleteCoffeById = (req, res) => {
    const { coffeeId } = req.params;

    if (!isUUID(coffeeId))
      return res.status(400).json({ error: 'El id no es un UUID válido' });

    this.coffeeService.deleteCoffeeById({ coffeeId })
      .then(coffee => res.json(coffee))
      .catch(error => handleError(error, res));
  }

}