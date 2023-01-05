import AppError from '@config/errors/AppError';
import { IRestaurantsRepository } from '@modules/restaurants/domain/repositories/interfaces/RestaurantsRepository.interface';
import { Restaurant } from '@modules/restaurants/typeorm/entities/Restaurant';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: number;
  userId: number;
}
@injectable()
export class OpenRestaurantService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository
  ) {}

  async execute({ id, userId }: IRequest): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepository.findWithUser(id);
    if (!restaurant) {
      throw new AppError('Restaurant not found');
    }

    if (restaurant.user.id !== userId) {
      throw new AppError(
        'The user provided its not the owner of this restaurant'
      );
    }

    restaurant.opened = true;
    await this.restaurantsRepository.save(restaurant);

    return restaurant;
  }
}
