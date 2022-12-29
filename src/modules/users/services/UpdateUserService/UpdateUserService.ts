import AppError from '@config/errors/AppError';
import { IUsersRepository } from '@modules/users/domain/repositories/interfaces/UsersRepository.interface';
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
  async execute({ id, name }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new AppError('User not found.', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.updateName(id, name);
  }
}
