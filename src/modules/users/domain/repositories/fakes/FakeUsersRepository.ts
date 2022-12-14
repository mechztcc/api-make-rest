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
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this.users.find((user) => {
      return user.email === email;
    });

    return user;
  }

  async findById(id: string | number): Promise<IUser | undefined> {
    const user = this.users.find((user) => {
      return user.id === id;
    });

    if (!user) {
      return;
    }
    return user;
  }



  async updateName(id: number, name: string): Promise<IUser | undefined> {
    const user = this.users.find((user) => {
      return user.id === id;
    });

    if (!user) {
      return;
    }

    user.name = name;
    return user;
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
