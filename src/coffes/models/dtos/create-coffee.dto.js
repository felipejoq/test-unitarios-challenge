import {createCoffeeSchema} from "./create-coffee.schema.js";

export class CreateCoffeeDto {

  constructor({ name, ingredients, id }) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
  }

  static create({ name, ingredients, id }) {

    const result = createCoffeeSchema.validate({ name, ingredients, id });

    if (result.error)
      return [result.error.message, null]

    return [null, new CreateCoffeeDto({ name, ingredients, id })]
  }

}