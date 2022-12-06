import { User } from '@modules/users/typeorm/entities/User';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: number;
  name: string;
}

export class UpdateUserService {
  async execute({ id, name }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.updateName(id, name);
  }
}
