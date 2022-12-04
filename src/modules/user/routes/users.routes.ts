import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { UsersController } from '../controllers/UsersController';
import isAuthenticated from '@shared/middlewares/isAuth';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post(
  '/create',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
    },
  }),
  usersController.create
);

export default usersRouter;
