import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ProductsModule } from './products/products.module';

// თქვენი დავალებაა წინა 21 დავალებას დაუმატოთ ერთი ახალი რესურსი
// nest g res products

// 1) ყველა პროდუქტს უნდა ჰპონდეს ფასი, სახელი, კატეგორია, აღწერა, რაოდენობა, ვალიდაციისთვის გამოიყენეთ class-validator class-transformer

// 2) იუზერების შექმნის დროს გადააკეთებთ ლოგიკას რო ყოველი ახალი იუზერის დამატებისას სისტემამ ავტომატურად მიანიჭოს subscriptionStartDate  და subscriptionEndDate, 1 თვე უნდა იყოს ყოველთვის საბსქრიფშენის ვადა.

// 3) ყველა პროდუქტის გამოძახებისას დაადეთ გარდი და შეამოწმეთ თუ მოყვება იმეილი და ამ იმეილით ნაპოვნ იუზერს აქვს აქტიური საბსქრიფშენი დააბრუნოს ფასდაკებული პროდუქტები თუ არადა და დააბრუნოს ჩვეულებრივი პროდუქტები.
// * გაითვალისწინეთ თუ იმეილი არ გადაეცი ჰედერში პროდუქტების წამოღების დროს ერორი არ უნდა დაარტყას და ყველა პროდუქტი უნდა დააბრუნოს.

// 4) იუზერების კონტროლერს დაამატეთ ახალი ენდფოინთი /upgrade-subscription და აქ თუ დაარექუსთებს იუზერი შეამოწმეთ რამდენად ვალიდური იუზერია და თუ ყველაფერი რიგზეა საბსქრიფშენის subscriptionEndDate გაუხანგრძლივეთ კიდევ ერთი თვით.

@Module({
  imports: [UserModule,ExpensesModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
