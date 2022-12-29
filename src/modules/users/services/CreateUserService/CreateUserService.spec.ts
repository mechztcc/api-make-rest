import { faker } from '@faker-js/faker';
import { FakeUsersRepository } from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import { Roles } from '@shared/types/Roles';
import { CreateUserService } from './CreateUserService';

describe('Create user', () => {
  it('It should be create a new user', async () => {
    const fakerUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(fakerUsersRepository);

    const user = await createUser.execute({
      name: 'User 01',
      email: faker.internet.email(),
      password: '123456',
      role: Roles.ADMIN,
    });

    expect(user).toHaveProperty('id');
  });
});
