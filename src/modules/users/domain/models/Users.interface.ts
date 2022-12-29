import { Restaurant } from '@modules/restaurants/typeorm/entities/Restaurant';
import { Roles } from '@shared/types/Roles';
import { UserStatus } from '@shared/types/UserStatus';

export interface IUser {
  id: number;

  name: string;

  email: string;

  password: string;

  status: UserStatus;

  roles: Roles;

  restaurants: Restaurant[];

  created_at?: Date;

  updated_at?: Date;
}
