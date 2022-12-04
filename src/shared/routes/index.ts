import authRouter from '@modules/auth/routes/auth.routes';
import usersRouter from '../../modules/user/routes/users.routes';

import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);


export default routes;
