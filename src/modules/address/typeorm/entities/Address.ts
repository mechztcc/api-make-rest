import { Restaurant } from '@modules/restaurants/typeorm/entities/Restaurant';
import { User } from '@modules/users/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  zip: string;

  @OneToOne(() => Restaurant)
  @JoinColumn()
  restaurant: Restaurant;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
