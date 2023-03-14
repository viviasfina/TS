/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantModule } from './variant/variant.module';
import { ProductModule } from './product/product.module';
import { VariantOptionModule } from './variant-option/variantOption.module';
import { OrderModule } from './order/order.module';
import { redisModuleFactory } from './redis.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from 'users/user.module';

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
    redisModuleFactory('127.0.0.1', 6379, 60),
    ProductModule,
    VariantModule,
    VariantOptionModule,
    OrderModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
