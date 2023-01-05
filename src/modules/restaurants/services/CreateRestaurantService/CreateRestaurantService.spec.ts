import { faker } from '@faker-js/faker';
import { FakerRestaurantsRepository } from '@modules/restaurants/domain/repositories/fakes/FakeRestaurantsRepository';
import { FakeUsersRepository } from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/interfaces/UsersRepository.interface';
import { CreateUserService } from '@modules/users/services/CreateUserService/CreateUserService';
import { Roles } from '@shared/types/Roles';
import { IRestaurantsRepository } from '../../domain/repositories/interfaces/RestaurantsRepository.interface';
import { CreateRestaurantService } from './CreateRestaurantService';

describe('CreateRestaurantsService', () => {
  let fakerRestaurantsRepository: IRestaurantsRepository;
  let fakerUsersRepository: IUsersRepository;

  beforeEach(() => {
    fakerRestaurantsRepository = new FakerRestaurantsRepository();
    fakerUsersRepository = new FakeUsersRepository();
  });

  it('Shoould be create a restaurant', async () => {
    const createRestaurantService = new CreateRestaurantService(
      fakerRestaurantsRepository,
      fakerUsersRepository
    );

    const createUserService = new CreateUserService(fakerUsersRepository);

    const user = await createUserService.execute({
      name: 'User 01',
      email: faker.internet.email(),
      password: '12345678',
      role: Roles.ADMIN,
    });

    const payload = {
      name: faker.company.name(),
      details: faker.commerce.productDescription(),
      userId: user.id,
    };

    const restaurant = await createRestaurantService.execute(payload);
    expect(restaurant).toHaveProperty('id');
  });
});
