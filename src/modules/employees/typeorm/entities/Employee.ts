import { Restaurant } from '@modules/restaurants/typeorm/entities/Restaurant';
import { EmployeeTypes } from '@shared/types/EmployeeTypes';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  document: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'enum', enum: EmployeeTypes, default: EmployeeTypes.GARÇOM })
  type: EmployeeTypes;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.employees)
  restaurant: Restaurant;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
