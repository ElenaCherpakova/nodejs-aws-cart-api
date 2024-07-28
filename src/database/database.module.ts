import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
import { CartEntity } from './entities/cart.entity';
import { CartItemEntity } from './entities/cart-item.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderEntity } from './entities/order.entity';
import { UserEntity } from './entities/user.entity';

dotenv.config();
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: 5432,
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        logging: true,
        entities: [CartEntity, CartItemEntity, OrderEntity, UserEntity],
        namingStrategy: new SnakeNamingStrategy(),
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    TypeOrmModule.forFeature([CartEntity, CartItemEntity, OrderEntity, UserEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
