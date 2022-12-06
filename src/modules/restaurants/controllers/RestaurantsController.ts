import AppError from '@config/errors/AppError';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';
import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';
import { getCustomRepository } from 'typeorm';
import { CreateRestaurantService } from '../services/CreateRestaurantService/CreateRestaurantService';
import { FindAllRestaurantsByUserService } from '../services/FindAllByUserService/FindAllByUserService';
import { FindRestaurantByIdService } from '../services/FindRestaurantByIdService/FindRestarauntByIdService';

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

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findRestaurantByIdService = new FindRestaurantByIdService();

    const restaurant = await findRestaurantByIdService.execute({
      id: Number(id),
    });

    return res.json(restaurant);
  }

  async findAllByUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findAllByUserService = new FindAllRestaurantsByUserService();
    const restaurants = await findAllByUserService.execute({ id: Number(id) });

    return res.json(restaurants);
  }
}