import { User } from '@modules/users/typeorm/entities/User';
import { getRepository } from 'typeorm';
import { Restaurant } from '../typeorm/entities/Restaurant';

interface IRequest {
  name: string;
  details: string;
  user: User;
}

export class CreateRestaurantService {
  async execute({ name, details, user }: IRequest): Promise<Restaurant> {
    const restaurantsRepository = getRepository(Restaurant);

    const restaurant = restaurantsRepository.create({
      name,
      details,
      user,
      opened: false,
    });
    await restaurantsRepository.save(restaurant);
    return restaurant;
  }
}
