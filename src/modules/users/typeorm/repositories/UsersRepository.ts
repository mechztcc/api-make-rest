import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.findOne({ where: { email } });

    return user;
  }

  async findById(id: number | string): Promise<User | undefined> {
    const user = this.findOne({ where: { id: id } });

    return user;
  }
}
