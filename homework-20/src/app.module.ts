import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// თქვენი დავალებაა წინა 23 დავალებას დაუმატოთ შემდეგი ფუნცქიონალი

// 1) დაამატეთ რეგისტრაცია/ავტორიზაცია JWT ტოკენის გამოყენებით.
// 2) დაამატეთ გარდი და დაიცავით სხვადასხვა როუტები რომ რენდომ იუზერებს არ მიცეთ იმის საშუალება რაც რეგისტრირებულ იუზერებს
// 3) სადაც იუზერების და სხვა რესურსების რეალაცია გაავთ დაამატეთ ლოგიკა რომ იუზერებმა სხვა იუზერების რესურსების წაშლა ან განახლება არ შეძლონ.

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL!),
    UserModule, ExpensesModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
