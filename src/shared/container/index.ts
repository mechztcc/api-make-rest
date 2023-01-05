import { IRestaurantsRepository } from '@modules/restaurants/domain/repositories/interfaces/RestaurantsRepository.interface';
import { RestaurantsRepository } from '@modules/restaurants/typeorm/repository/RestaurantsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/interfaces/UsersRepository.interface';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IRestaurantsRepository>(
  'RestaurantsRepository',
  RestaurantsRepository
);
