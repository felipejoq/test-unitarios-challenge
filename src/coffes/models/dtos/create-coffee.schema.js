import Joi from 'joi';

export const createCoffeeSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().min(1).required()
    .error(new Error('El nombre es requerido y debe tener mínimo 1 carácteres')),
  ingredients: Joi.array().min(1).required()
    .error(new Error('Los ingredientes son requeridos y debe tener mínimo 1 item')),
});