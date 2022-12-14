import isAuth from '@shared/middlewares/isAuth';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { EmployeesController } from '../controllers/EmployeesController';

const employeesController = new EmployeesController();

const employeesRouter = Router();

employeesRouter.post(
  '/create',
  isAuth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      document: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      type: Joi.string().required(),
      restaurantId: Joi.number().required(),
    },
  }),
  employeesController.create
);

export default employeesRouter;
