import AppError from '@config/errors/AppError';
import { IUser } from '@modules/users/domain/models/Users.interface';
import { IUsersRepository } from '@modules/users/domain/repositories/interfaces/UsersRepository.interface';
import { User } from '@modules/users/typeorm/entities/User';
import { HttpStatus } from '@shared/types/HttpStatus';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: number;
  name: string;
}

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}
  async execute({ id, name }: IRequest): Promise<IUser | undefined> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new AppError('User not found.', HttpStatus.NOT_FOUND);
    }

    const user = await this.usersRepository.updateName(id, name);
    user?.password = undefined
    return user;
  }
}
