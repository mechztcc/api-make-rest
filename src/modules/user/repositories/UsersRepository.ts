import { EntityRepository, Repository } from 'typeorm';
import { User } from '../typeorm/entities/User';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ where: { email } });
    return user;
  }
}
