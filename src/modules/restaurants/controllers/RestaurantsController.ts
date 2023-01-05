import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRestaurantService } from '../services/CreateRestaurantService/CreateRestaurantService';
import { FindAllRestaurantsByUserService } from '../services/FindAllByUserService/FindAllByUserService';
import { FindRestaurantByIdService } from '../services/FindRestaurantByIdService/FindRestarauntByIdService';
import { OpenRestaurantService } from '../services/OpenRestaurantService/OpenRestaurantService';

export class RestaurantController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, details } = req.body;
    const userId = 1;

    const createRestaurantService = container.resolve(CreateRestaurantService);

    const restaurant = await createRestaurantService.execute({
      name,
      details,
      userId,
    });

    return res.json(restaurant);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findRestaurantByIdService = container.resolve(
      FindRestaurantByIdService
    );

    const restaurant = await findRestaurantByIdService.execute({
      id: Number(id),
    });

    return res.json(restaurant);
  }

  async findAllByUser(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const findAllByUserService = container.resolve(
      FindAllRestaurantsByUserService
    );
    const restaurants = await findAllByUserService.execute({
      id: Number(userId),
    });

    return res.json(restaurants);
  }

  async openRestaurant(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { id } = req.params;

    const openRestaurantService = container.resolve(OpenRestaurantService);

    const restaurant = await openRestaurantService.execute({
      id: Number(id),
      userId: Number(userId),
    });

    return res.json(restaurant);
  }
}
