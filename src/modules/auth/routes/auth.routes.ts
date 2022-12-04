import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { AuthController } from '../controllers/AuthController';

const authController = new AuthController();

const authRouter = Router();

authRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authController.login
);

export default authRouter;
