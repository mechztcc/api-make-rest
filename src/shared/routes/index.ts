import addressRouter from '@modules/address/routes/address.routes';
import authRouter from '@modules/auth/routes/auth.routes';
import restaurantsRouter from '@modules/restaurants/routes/restaurants.router';
import usersRouter from '../../modules/users/routes/users.routes';

import categoriesRouter from '@modules/category/routes/categories.router';
import employeesRouter from '@modules/employees/routes/employees.routes';
import productsRouter from '@modules/products/routes/products.routes';
import { Response, Router, Request } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/restaurants', restaurantsRouter);
routes.use('/addresses', addressRouter);
routes.use('/categories', categoriesRouter);
routes.use('/products', productsRouter);
routes.use('/employees', employeesRouter);

routes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'All works fine!' });
});

export default routes;
