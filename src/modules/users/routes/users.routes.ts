import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { UsersController } from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post(
  '/',
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

usersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      id: Joi.number().required(),
    },
  }),
  usersController.update
);

export default usersRouter;
