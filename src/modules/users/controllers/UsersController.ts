import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService/CreateUserService';
import { UpdateUserService } from '../services/UpdateUserService/UpdateUserService';

export class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, role } = req.body;

    const createUsersService = new CreateUserService();

    const user = await createUsersService.execute({
      name,
      email,
      password,
      role,
    });

    return res.send(user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id, name } = req.body;

    const updateUserService = new UpdateUserService();

    await updateUserService.execute({ id, name });

    return res.status(202).send();
  }
}
