import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { CartEntity } from './cart.entity';
import { CartStatuses } from '../../cart/models';
import { UserEntity } from './user.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'uuid', name: 'cart_id' })
  cartId: string;

  @Column('json')
  payment: {
    type: string;
    address: string;
    creditCard?: any;
  };

  @Column('json')
  delivery: {
    type: string;
    address: string;
  };

  @Column('text')
  comments: string;

  @Column({
    type: 'enum',
    enum: CartStatuses,
    default: CartStatuses.OPEN,
  })
  status: CartStatuses;

  @Column('int')
  total: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => CartEntity, (cart) => cart.order, {
    nullable: false,
  })
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;
}
