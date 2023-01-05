import AppError from '@config/errors/AppError';
import { IRestaurantsRepository } from '@modules/restaurants/domain/repositories/interfaces/RestaurantsRepository.interface';
import { IUsersRepository } from '@modules/users/domain/repositories/interfaces/UsersRepository.interface';
import { User } from '@modules/users/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import { Restaurant } from '../../typeorm/entities/Restaurant';

interface IRequest {
  name: string;
  details: string;
  userId: string | number;
}

@injectable()
export class CreateRestaurantService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute({ name, details, userId }: IRequest): Promise<Restaurant> {
    const userExist = await this.usersRepository.findById(userId);
    if (!userExist) {
      throw new AppError('User not found');
    }

    const restaurant = await this.restaurantsRepository.create({
      name,
      details,
      user: userExist,
      opened: false,
    });

    await this.restaurantsRepository.save(restaurant);
    return restaurant;
  }
}
