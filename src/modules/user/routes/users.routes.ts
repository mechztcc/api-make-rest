import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.get('/create', usersController.create);

export default usersRouter;
