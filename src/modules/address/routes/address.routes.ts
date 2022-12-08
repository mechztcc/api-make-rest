import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { AddressesController } from '../controllers/AddressesController';

const addressController = new AddressesController();

const addressRouter = Router();

addressRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      city: Joi.string().required(),
      street: Joi.string().required(),
      zip: Joi.string().required(),
      state: Joi.string().required(),
      number: Joi.string().required(),
      complement: Joi.string().required(),
      restaurantId: Joi.number().required(),
    },
  }),
  addressController.create
);

addressRouter.get(
  '/restaurants/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  addressController.findByRestaurant
);

export default addressRouter;
