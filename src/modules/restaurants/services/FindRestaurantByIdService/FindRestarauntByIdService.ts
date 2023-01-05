import AppError from '@config/errors/AppError';
import { IRestaurantsRepository } from '@modules/restaurants/domain/repositories/interfaces/RestaurantsRepository.interface';
import { Restaurant } from '@modules/restaurants/typeorm/entities/Restaurant';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: number;
}
@injectable()
export class FindRestaurantByIdService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository
  ) {}

  async execute({ id }: IRequest): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepository.findById(id);
    if (!restaurant) {
      throw new AppError('Restaurant not found');
    }

    return restaurant;
  }
}
