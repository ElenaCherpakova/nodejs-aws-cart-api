import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { CartEntity } from './cart.entity';
// import { OrderEntity } from './order.entity';
@Entity('cart_items')
export class CartItemEntity {
  @PrimaryColumn({ type: 'uuid', name: 'cart_id' })
  cartId: string;

  @PrimaryColumn({ type: 'uuid', name: 'product_id' })
  productId: string;

  @Column({ type: 'int' })
  count: number;

  @ManyToOne(() => CartEntity, (cart) => cart.items, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;
}
