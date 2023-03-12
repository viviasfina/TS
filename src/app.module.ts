/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantModule } from './variant/variant.module';
// import { ProductService } from './product/product.service';
// import { OrderItem } from './entities/orderItem.entity';
// import { Product } from './entities/product.entity';
// import { Variant } from './entities/variant.entity';
// import { VariantOption } from './entities/variantOption.entity';
// import { Order } from './entities/order.entity';
import { ProductModule } from './product/product.module';
import { VariantOptionModule } from './variant-option/variantOption.module';
import { OrderModule } from './order/order.module';
import * as redisStore from 'cache-manager-redis-store';
import { RedisConfig } from './redis.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'vivi',
      database: 'orders_schema',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      migrationsTableName: 'migrations',
      migrations: ['dist/migrations/*.js'],
      cli: {
        migrationsDir: 'src/migration',
      },
    }),
    //redisModuleFactory(),
    ProductModule,
    VariantModule,
    VariantOptionModule,
    OrderModule,
  ],
})
//factory redis
export class AppModule {}
