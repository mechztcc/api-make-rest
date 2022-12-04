import AppError from '@config/errors/AppError';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { CreateRestaurantService } from '../services/CreateRestaurantService';

export class RestaurantController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, details } = req.body;
    const userId = req.user.id;

    const createRestaurantService = new CreateRestaurantService();
    const usersRepository = getCustomRepository(UsersRepository);

    const userExist = await usersRepository.findOne({ where: { id: userId } });
    if (!userExist) {
      throw new AppError('User not found');
    }

    const restaurant = await createRestaurantService.execute({
      name,
      details,
      user: userExist,
    });

    return res.json(restaurant);
  }
}
