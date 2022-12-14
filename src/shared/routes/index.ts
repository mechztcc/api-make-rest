import authRouter from '@modules/auth/routes/auth.routes';
import usersRouter from '../../modules/users/routes/users.routes';
import restaurantsRouter from '@modules/restaurants/routes/restaurants.router';
import addressRouter from '@modules/address/routes/address.routes';

import { Router } from 'express';
import categoriesRouter from '@modules/category/routes/categories.router';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/restaurants', restaurantsRouter);
routes.use('/addresses', addressRouter);
routes.use('/categories', categoriesRouter);

export default routes;
