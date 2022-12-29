import AppError from '@config/errors/AppError';
import { faker } from '@faker-js/faker';
import { FakeUsersRepository } from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import { HttpStatus } from '@shared/types/HttpStatus';
import { Roles } from '@shared/types/Roles';
import { CreateUserService } from './CreateUserService';

describe('Create user', () => {
  it('It should be create a new user', async () => {
    const fakerUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(fakerUsersRepository);

    const user = await createUser.execute({
      name: 'User 01',
      email: faker.internet.email(),
      password: '12345678',
      role: Roles.ADMIN,
    });

    expect(user).toHaveProperty('id');
    expect(typeof user.password).toBe('string');
  });

  it('It should be throw new AppError when try to create user with already in use email', async () => {
    const fakerUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(fakerUsersRepository);

    const user = await createUser.execute({
      name: 'User 01',
      email: faker.internet.email(),
      password: '12345678',
      role: Roles.ADMIN,
    });

    createUser
      .execute({
        name: 'User 01',
        email: user.email,
        password: '12345678',
        role: Roles.ADMIN,
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(AppError);
        expect(error).toHaveProperty('message', 'Email address already used.');
        expect(error).toHaveProperty('statusCode', HttpStatus.CONFLICT);
      });
  });

  it('It should return status 422 when password has lengh minor that 8 digits', async () => {
    const fakerUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(fakerUsersRepository);

    createUser
      .execute({
        name: 'User 01',
        email: faker.internet.email(),
        password: '123456',
        role: Roles.ADMIN,
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(AppError);
        expect(error).toHaveProperty(
          'message',
          'Password lenght must be at least 8 characters.'
        );
        expect(error).toHaveProperty('statusCode', HttpStatus.UNPROCESSABLE_ENTITY);
      });
  });
});
