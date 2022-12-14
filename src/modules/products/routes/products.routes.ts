import isAuth from '@shared/middlewares/isAuth';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ProductsController } from '../controllers/ProductsController';

const productsController = new ProductsController();

const productsRouter = Router();

productsRouter.post(
  '/create',
  isAuth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.string().required(),
      categoryId: Joi.number().required(),
    },
  }),
  productsController.create
);

productsRouter.get(
  '/:id',
  isAuth,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  productsController.findById
);

export default productsRouter;
