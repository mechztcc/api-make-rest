import { Roles } from '@shared/types/Roles';
import { UserStatus } from '@shared/types/UserStatus';

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  roles: Roles;
  status: UserStatus;
}
