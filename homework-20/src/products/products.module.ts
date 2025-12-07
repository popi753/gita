import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UserModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { productModel } from './schemas/product.schema';

@Module({
  imports: [UserModule,
    MongooseModule.forFeature([
      { name: "product", schema: productModel }
    ])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
