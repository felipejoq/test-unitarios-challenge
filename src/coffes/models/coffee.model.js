import { getUUID } from "../../config/plugins/uuid.plugin.js";

export class CoffeeModel {
  constructor(args) {
    const { name, ingredients, id = this.getId() } = args;

    this.id = id
    this.name = name;
    this.ingredients = ingredients;
  }

  getId() {
    return getUUID();
  }
}