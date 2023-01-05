import { IRestaurantsRepository } from '@modules/restaurants/domain/repositories/interfaces/RestaurantsRepository.interface';
import { Restaurant } from '@modules/restaurants/typeorm/entities/Restaurant';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: number;
}
@injectable()
export class FindAllRestaurantsByUserService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository
  ) {}

  async execute({ id }: IRequest): Promise<Restaurant[]> {
    const restaurants = await this.restaurantsRepository.findAllByUser(id);
    return restaurants;
  }
}
