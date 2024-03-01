import request from 'supertest';
import {testServer} from '../../test-server';
import {describe, beforeAll, afterAll, beforeEach, test, expect} from '@jest/globals';
import {DataService} from "../../../src/common/services/data.service.js";
import {envsPlugin} from "../../../src/config/plugins/envs.plugin.js";
import {CoffeeService} from "../../../src/coffes/services/coffee.service.js";

const dataService = new DataService();
const coffeeService = new CoffeeService(dataService);

const coffee1 = {
  id: "3c2cc1f0-96c7-48fc-9bec-51b580042136",
  name: "Coffe example 1",
  ingredients: ["ingredient 1", "ingredient 2"],
}
const coffee2 = {
  id: "3c2cc1f0-96c7-48fc-9bec-51b580042136",
  name: "Coffe example 2",
  ingredients: ["ingredient 3", "ingredient 4"],
}

const coffee3 = {
  id: "3c2cc1f0-96c7-48fc-9bec-51b580042136",
  name: "Coffe example 3",
  ingredients: ["ingredient 5", "ingredient 6"],
}

describe('Teste in /api/v1/coffe', () => {

  beforeAll(async () => {
    await dataService.saveData({
      data: [coffee1, coffee2],
      pathFile: envsPlugin.PATH_DATA,
      dataName: envsPlugin.DATA_NAME
    });

    await testServer.start();
  });

  afterAll(async () => {
    await dataService.deleteData({pathFile: envsPlugin.PATH_DATA, dataName: envsPlugin.DATA_NAME})
    testServer.close();
  });

  test('should return a list of coffees', async () => {
    const {body} = await request(testServer.app)
      .get("/api/v1/coffee")
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body).toEqual([coffee1, coffee2])

  });

  test('should return a Coffee by ID api/v1/coffee/:coffeeId', async () => {
    const {body} = await request(testServer.app)
      .get(`/api/v1/coffee/${coffee1.id}`)
      .expect(200);

    expect(body).toEqual(coffee1)

  });

  test('update coffee by id api/v1/coffee/:coffee', async () => {
    const {body} = await request(testServer.app)
      .put(`/api/v1/coffee/123`)
      .send({
        ...coffee1,
        name: 'New name'
      })
    
    expect(body.error).toEqual('El id de la url no coincide con la del payload');
  })

  test('Post a new Coffee api/v1/coffee', async () => {

    const {body} = await request(testServer.app)
      .post(`/api/v1/coffee/`)
      .send(coffee3)
      .expect(201);

    expect(body).toEqual(expect.objectContaining(coffee3));

  });

  test('delete coffee by id api/v1/coffee/:coffeeId', async () => {
    const {body} = await request(testServer.app)
      .delete(`/api/v1/coffee/${coffee1.id}`);

    expect(body).toEqual(coffee1);
  })

  test('not valid uuid api/v1/coffee/:coffeeId', async () => {
    const {body} = await request(testServer.app)
      .delete(`/api/v1/coffee/123`)
      .expect(400)

    expect(body.error).toEqual('El id no es un UUID válido')
  })

  test('not found by uuid api/v1/coffee/:coffeeId', async () => {
    const {body} = await request(testServer.app)
      .delete(`/api/v1/coffee/3c2cc1f0-96c7-48fc-9bec-51b580042137`)
    expect(404);

    expect(body.error).toEqual('Café con id: 3c2cc1f0-96c7-48fc-9bec-51b580042137 no existe.')

  })

});