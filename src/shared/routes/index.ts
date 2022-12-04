import authRouter from '@modules/auth/routes/auth.routes';
import usersRouter from '../../modules/users/routes/users.routes';
import restaurantsRouter from '@modules/restaurants/routes/restaurants.router';

import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/restaurants', restaurantsRouter);

export default routes;
