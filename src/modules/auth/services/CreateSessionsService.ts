import auth from '@config/auth/auth';
import AppError from '@config/errors/AppError';
import { UsersRepository } from '@modules/user/typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  email: string;
  password: string;
}

export class CreateSessionsService {
  constructor() {}

  async execute({ email, password }: IRequest): Promise<any> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, auth.jwt.secret, {
      subject: auth.jwt.secret,
      expiresIn: auth.jwt.expiresIn,
    });

    return { user, token };
  }
}
