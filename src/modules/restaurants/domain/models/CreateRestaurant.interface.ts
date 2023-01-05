import { Category } from '@modules/category/typeorm/entities/Category';
import { Employee } from '@modules/employees/typeorm/entities/Employee';
import { User } from '@modules/users/typeorm/entities/User';

export interface ICreateRestaurant {
  name: string;
  details: string;
  opened: boolean;
  user: User;
  categories?: Category[];
  employees?: Employee[];
}
