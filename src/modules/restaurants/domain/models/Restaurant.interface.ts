import { IUser } from '@modules/users/domain/models/Users.interface';

export interface IRestaurant {
  id: number;

  name: string;

  details: string;
  opened: boolean;
  user: IUser;

  categories: any[];

  employees: any[];

  created_at: Date;

  updated_at: Date;
}
