import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CartEntity } from './cart.entity';
import { OrderEntity } from './order.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', default: '' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToOne(() => CartEntity, (cart) => cart.user, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  cart: CartEntity;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
