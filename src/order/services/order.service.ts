import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Order } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/database/entities/order.entity';
import { CartStatuses } from 'src/cart';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
  ) {}

  async findById(orderId: string) {
    return await this.orderRepo.findOneBy({ id: orderId });
  }

  async create(data: Order) {
    const id = v4();
    const newOrder = await this.orderRepo.create({
      id,
      ...data,
      status: CartStatuses.ORDERED,
    });

    return await this.orderRepo.save(newOrder);
  }

  //   async update(orderId: string, data: Order) {
  //     const order = await this.findById(orderId);

  //     if (!order) {
  //       throw new Error('Order does not exist.');
  //     }

  //     const newOrder = this.orderRepo.create({
  //       id: orderId,
  //       ...data,
  //     });
  //     await this.orderRepo.save(newOrder);
  //   }
}
