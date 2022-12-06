import AppError from '@config/errors/AppError';
import { Restaurant } from '@modules/restaurants/typeorm/entities/Restaurant';
import { RestaurantsRepository } from '@modules/restaurants/typeorm/repository/RestaurantsRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: number;
}

export class FindRestaurantByIdService {
  async execute({ id }: IRequest): Promise<Restaurant> {
    const restaurantsRepository = getCustomRepository(RestaurantsRepository);

    const restaurant = await restaurantsRepository.findById(id);
    if (!restaurant) {
      throw new AppError('Restaurant not found');
    }

    return restaurant;
  }
}