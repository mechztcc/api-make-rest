import AppError from '@config/errors/AppError';
import { IUsersRepository } from '@modules/users/domain/repositories/interfaces/UsersRepository.interface';
import { User } from '@modules/users/typeorm/entities/User';
import { HttpStatus } from '@shared/types/HttpStatus';
import { Roles } from '@shared/types/Roles';
import { UserStatus } from '@shared/types/UserStatus';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.', HttpStatus.CONFLICT);
    }

    if (password.length < 8) {
      throw new AppError('Password lenght must be at least 8 characters.', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      roles: Roles.ADMIN,
      status: UserStatus.ACTIVE,
    });
    await this.usersRepository.save(user);

    return user;
  }
}
