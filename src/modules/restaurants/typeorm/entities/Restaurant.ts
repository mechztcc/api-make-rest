import { User } from '../../../users/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '@modules/category/typeorm/entities/Category';
import { Employee } from '@modules/employees/typeorm/entities/Employee';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  details: string;

  @Column()
  opened: boolean;

  @ManyToOne(() => User, (user) => user.restaurants)
  user: User;

  @OneToMany(() => Category, (category) => category.restaurant)
  categories: Category[];

  @OneToMany(() => Employee, (employee) => employee.restaurant)
  employees: Employee[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
