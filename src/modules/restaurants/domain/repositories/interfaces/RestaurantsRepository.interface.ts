import { IUser } from '@modules/users/domain/models/Users.interface';
import { ICreateRestaurant } from '../../models/CreateRestaurant.interface';
import { IRestaurant } from '../../models/Restaurant.interface';

export interface IRestaurantsRepository {
  findById(id: number): Promise<IRestaurant | undefined>;

  findAllByUser(id: number): Promise<IRestaurant[]>;

  findWithUser(id: number): Promise<IRestaurant | undefined>;

  create({
    name,
    details,
    user,
    opened,
  }: ICreateRestaurant): Promise<IRestaurant>;

  save(restaurant: IRestaurant): Promise<IRestaurant>;
}
