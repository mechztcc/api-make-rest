import { IUsersRepository } from '@modules/users/domain/repositories/UsersRepository.interface';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
