import fs from 'node:fs';
import {CustomError} from '../../config/errors/custom.errors.js';
import path from "node:path";

export class DataService {

  async readFile({pathFile, dataName}) {
    if (await this.checkFileExist({pathFile, dataName})) {
      return JSON.parse(fs.readFileSync(path.join(pathFile, dataName), {encoding: 'utf-8'}));
    }
  }

  async checkFileExist({pathFile, dataName}) {
    try {
      const file = path.join(pathFile, dataName);
      if (!fs.existsSync(pathFile)) {
        fs.mkdirSync(pathFile, { recursive: true });
      }

      if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify([]));
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async saveData({data, pathFile, dataName}) {
    try {
      if (await this.checkFileExist({pathFile, dataName})) {
        fs.writeFileSync(path.join(pathFile, dataName), JSON.stringify(data));
        return true;
      }
    } catch (error) {
      console.error(error);
      throw CustomError.internalServer('Hubo un error inesperado.');
    }
  }

  async deleteData({pathFile, dataName}){
    try{
      fs.unlinkSync(path.join(pathFile, dataName))
      return true;
    } catch (e) {
      console.log(e)
      return false;
    }
  }

}