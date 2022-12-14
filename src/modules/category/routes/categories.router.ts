import isAuth from '@shared/middlewares/isAuth';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CategoriesController } from '../controllers/CategoriesController';

const categoriesController = new CategoriesController();

const categoriesRouter = Router();

categoriesRouter.post(
  '/create',
  isAuth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      restaurantId: Joi.number().required(),
    },
  }),
  categoriesController.create
);

export default categoriesRouter;
