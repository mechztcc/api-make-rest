import { Restaurant } from '@modules/restaurants/typeorm/entities/Restaurant';
import { RestaurantsRepository } from '@modules/restaurants/typeorm/repository/RestaurantsRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: number;
}

export class FindAllRestaurantsByUserService {
  async execute({ id }: IRequest): Promise<Restaurant[]> {
    const restaurantsRepository = getCustomRepository(RestaurantsRepository);

    const restaurants = await restaurantsRepository.findAllByUser(id);
    return restaurants;
  }
}
