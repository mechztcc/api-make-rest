import { Roles } from '@shared/types/Roles';

declare namespace Express {
  export interface Request {
    user: {
      id: string;
      role?: Roles;
    };
  }
}
