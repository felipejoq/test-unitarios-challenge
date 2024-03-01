import {envsPlugin} from '../../config/plugins/envs.plugin.js';
import {CustomError} from "../../config/errors/custom.errors.js";
import {CoffeeModel} from "../models/coffee.model.js";

export class CoffeeService {

  PATH_DATA = envsPlugin.PATH_DATA;
  DATA_NAME = envsPlugin.DATA_NAME;

  constructor(dataService) {
    this.dataService = dataService;
  }

  async getCoffees() {
    return await this.dataService.readFile({pathFile: this.PATH_DATA, dataName: this.DATA_NAME});
  }

  async getCoffeeById({coffeeId}){
    const coffees = await this.getCoffees();
    const coffee = coffees.find(coffee => coffee.id === coffeeId);

    if (!coffee)
      throw CustomError.notFound(`Café con id: ${coffeeId} no existe.`);

    return coffee;
  }

  async createCoffee(createSongDto){
    const newCoffee = new CoffeeModel({ ...createSongDto });

    const coffees = [
      ... await this.getCoffees(),
      newCoffee
    ]

    await this.dataService.saveData({ data: coffees, pathFile: this.PATH_DATA, dataName: this.DATA_NAME });

    return newCoffee;
  }

  async updateCoffeeById(updateSongDto) {

    const newCoffee = new CoffeeModel({ ...updateSongDto });

    let coffees = await this.getSongs();

    coffees = coffees.map(song => {
      if (song.id === updateSongDto.id) {
        return { ...newCoffee }
      }
      return song;
    })

    await this.dataService.saveData({ data: coffees, pathFile: this.PATH_DATA, dataName: this.DATA_NAME });

    return coffees;

  }

  async deleteCoffeeById({coffeeId}) {
    // This action return an error when the coffee not found
    const coffee = await this.getCoffeeById({ coffeeId });

    let coffees = await this.getCoffees();

    coffees = coffees.filter(coffee => coffee.id !== coffeeId)

    await this.dataService.saveData({ data: coffees, pathFile: this.PATH_DATA, dataName: this.DATA_NAME });

    // Return the found coffee
    return coffee;
  }

}