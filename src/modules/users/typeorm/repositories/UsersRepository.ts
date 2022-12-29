import { ICreateUser } from '@modules/users/domain/models/CreateUser.interface';
import { IUser } from '@modules/users/domain/models/Users.interface';
import { IUsersRepository } from '@modules/users/domain/repositories/interfaces/UsersRepository.interface';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

@EntityRepository(User)
export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  create({ name, email, password, roles, status }: ICreateUser): IUser {
    const user = this.repository.create({
      name,
      email,
      password,
      roles,
      status,
    });
    return user;
  }

  async save(user: IUser): Promise<IUser> {
    const createdUser = await this.repository.save(user);
    return createdUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.repository.findOne({ where: { email } });

    return user;
  }

  async findById(id: number | string): Promise<User | undefined> {
    const user = this.repository.findOne({ where: { id: id } });

    return user;
  }

  async updateName(id: number, name: string): Promise<void> {
    this.repository
      .createQueryBuilder('users')
      .update(User)
      .set({ name: name })
      .where('id = :id', { id: id })
      .execute();
  }
}
