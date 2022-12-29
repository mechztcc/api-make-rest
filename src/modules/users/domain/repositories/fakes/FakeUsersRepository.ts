import { ICreateUser } from '../../models/CreateUser.interface';
import { IUser } from '../../models/Users.interface';
import { IUsersRepository } from '../interfaces/UsersRepository.interface';
import { faker } from '@faker-js/faker';
import { Roles } from '@shared/types/Roles';
import { UserStatus } from '@shared/types/UserStatus';

export class FakeUsersRepository implements IUsersRepository {
  public users: IUser[] = [];

  constructor() {
    const user: IUser = {
      id: Number(faker.random.numeric()),
      email: 'email@email.com',
      name: faker.name.fullName(),
      password: faker.internet.password(),
      roles: Roles.ADMIN,
      status: UserStatus.ACTIVE,
      created_at: faker.date.birthdate(),
      updated_at: faker.date.birthdate(),
      restaurants: [],
    };
    this.users.push(user);

    for (let index = 0; index < 5; index++) {
      const user: IUser = {
        id: index + 1,
        email: faker.internet.email(),
        name: faker.name.fullName(),
        password: faker.internet.password(),
        roles: Roles.ADMIN,
        status: UserStatus.ACTIVE,
        created_at: faker.date.birthdate(),
        updated_at: faker.date.birthdate(),
        restaurants: [],
      };
      this.users.push(user);
    }
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this.users.find((user) => {
      return user.email === email;
    });

    return user;
  }

  findById(id: string | number): Promise<IUser | undefined> {
    throw new Error('Method not implemented.');
  }
  updateName(id: number, name: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  create({ name, email, password, roles, status }: ICreateUser): IUser {
    const user: IUser = {
      name,
      email,
      password,
      roles,
      status,
      id: Number(faker.random.numeric()),
      restaurants: [],
    };

    return user;
  }

  async save(user: IUser): Promise<IUser> {
    this.users.push(user);
    return user;
  }
}
