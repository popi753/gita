import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// თქვენი დავალებაა წინა დავალებებს ანუ  20, 21, 22 დაუმატოთ მონგოდბ ის იმპლემენტაცია

// 1) იუზერებზე, იქსფენსებზე, პროდუქტებზე

// 2) თქვენით განსაზღვფრეთ რომელ კოლექციებს შორის იქნება რელაცია მაგალთად, იუზერებსად და იქსფენსებს შორის.

// 3) შეეცადეთ ქრადის დროს ყველაფერი გააკეთოთ სწორად, და არ გამოგრჩეთ წაშლა ან განახლება ან რაიმე სხვა, ასევე ვალიდაციები.

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
