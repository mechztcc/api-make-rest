import AppError from '@config/errors/AppError';
import { Restaurant } from '@modules/restaurants/typeorm/entities/Restaurant';
import { RestaurantsRepository } from '@modules/restaurants/typeorm/repository/RestaurantsRepository';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: number;
  userId: number;
}

export class OpenRestaurantService {
  async execute({ id, userId }: IRequest): Promise<Restaurant> {
    const restaurantsRepository = getCustomRepository(RestaurantsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const restaurant = await restaurantsRepository.findWithUser(id);
    if (!restaurant) {
      throw new AppError('Restaurant not found');
    }
    
    if (restaurant.user.id !== userId) {
      throw new AppError(
        'The user provided its not the owner of this restaurant'
      );
    }

    restaurant.opened = true;
    await restaurantsRepository.save(restaurant);

    return restaurant;
  }
}
