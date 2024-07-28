import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CartStatuses } from '../../cart/models';
import { CartItemEntity } from './cart-item.entity';
import { OrderEntity } from './order.entity';
@Entity('carts')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({
    type: 'enum',
    enum: CartStatuses,
    default: CartStatuses.OPEN,
  })
  status: CartStatuses;

  @UpdateDateColumn({ type: 'date', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'date', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => CartItemEntity, (item) => item.cart)
  items: CartItemEntity[];

  @OneToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => OrderEntity, (order) => order.cart, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'id' })
  order: OrderEntity;
}
