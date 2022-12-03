import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService/CreateUserService';

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
}
