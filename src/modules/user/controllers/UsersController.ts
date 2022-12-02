import { Request, Response } from 'express';

export class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    return res.json({ ok: true });
  }
}
