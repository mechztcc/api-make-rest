import { faker } from '@faker-js/faker';
import { FakeUsersRepository } from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/interfaces/UsersRepository.interface';
import { Roles } from '@shared/types/Roles';
import { CreateUserService } from '../CreateUserService/CreateUserService';
import { UpdateUserService } from './UpdateUserService';

describe('Update user', () => {
  let fakerUsersRepository: IUsersRepository;

  beforeEach(() => {
    fakerUsersRepository = new FakeUsersRepository();
  });

  it('Should be update name of a exists user', async () => {
    const updateUserService = new UpdateUserService(fakerUsersRepository);
    const createUser = new CreateUserService(fakerUsersRepository);

    const user = await createUser.execute({
      name: 'User 01',
      email: faker.internet.email(),
      password: '12345678',
      role: Roles.ADMIN,
    });

    const newName = 'Newst name';
    const updatedUser = await updateUserService.execute({
      id: user.id,
      name: newName,
    });

    expect(updatedUser?.name).toEqual(newName);
  });
});
