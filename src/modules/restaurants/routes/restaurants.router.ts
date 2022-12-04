import isAuth from '@shared/middlewares/isAuth';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { RestaurantController } from '../controllers/RestaurantsController';

const restaurantsController = new RestaurantController();

const restaurantsRouter = Router();

restaurantsRouter.post(
  '/create',
  isAuth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      details: Joi.string().required(),
    },
  }),
  restaurantsController.create
);

export default restaurantsRouter;
