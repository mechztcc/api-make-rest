import AppError from '@config/errors/AppError';
import { faker } from '@faker-js/faker';
import { FakeUsersRepository } from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/interfaces/UsersRepository.interface';
import { CreateUserService } from '@modules/users/services/CreateUserService/CreateUserService';
import { HttpStatus } from '@shared/types/HttpStatus';
import { Roles } from '@shared/types/Roles';
import { CreateSessionsService } from './CreateSessionsService';

describe('Create sessions', () => {
  let fakerUsersRepository: IUsersRepository;

  beforeEach(() => {
    fakerUsersRepository = new FakeUsersRepository();
  });

  it('Should be create a new session', async () => {
    const createUser = new CreateUserService(fakerUsersRepository);

    const createSessionsService = new CreateSessionsService(
      fakerUsersRepository
    );

    const user = await createUser.execute({
      name: faker.name.firstName(),
      email: 'faker@email.com',
      password: '12345678',
      role: Roles.ADMIN,
    });

    const session = await createSessionsService.execute({
      email: user.email,
      password: '12345678',
    });

    expect(session).toHaveProperty('token');
  });

  it('Should be return status UNAUTHORIZED', async () => {
    const createUser = new CreateUserService(fakerUsersRepository);

    const createSessionsService = new CreateSessionsService(
      fakerUsersRepository
    );

    const user = await createUser.execute({
      name: faker.name.firstName(),
      email: 'faker@email.com',
      password: '12345678',
      role: Roles.ADMIN,
    });

    await createSessionsService
      .execute({
        email: user.email,
        password: 'invalid_pass',
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(AppError);
        expect(error).toHaveProperty(
          'message',
          'Incorrect email/password combination.'
        );
        expect(error).toHaveProperty('statusCode', HttpStatus.UNAUTHORIZED);
      });
  });
});
