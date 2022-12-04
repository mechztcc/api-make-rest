import { Request, Response } from 'express';
import { CreateSessionsService } from '../services/CreateSessionsService';

export class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSessionsService = new CreateSessionsService();

    const auth = await createSessionsService.execute({
      email,
      password,
    });

    return res.send(auth);
  }
}
