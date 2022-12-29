import { ICreateUser } from '../../models/CreateUser.interface';
import { IUser } from '../../models/Users.interface';

export interface IUsersRepository {
  findByEmail(email: string): Promise<IUser | undefined>;

  findById(id: number | string): Promise<IUser | undefined>;

  updateName(id: number, name: string): Promise<IUser | undefined>;

  create({ name, email, password, roles, status }: ICreateUser): IUser;

  save(user: IUser): Promise<IUser>;
}
