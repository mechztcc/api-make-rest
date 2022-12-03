import AppError from '@config/errors/AppError';
import { UsersRepository } from '@modules/user/repositories/UsersRepository';
import { User } from '@modules/user/typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { Roles } from '@shared/types/Roles';
import { UserStatus } from '@shared/types/UserStatus';

interface IRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export class CreateUserService {
  constructor() {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      roles: Roles.ADMIN,
      status: UserStatus.ACTIVE,
    });
    await usersRepository.save(user);

    return user;
  }
}
