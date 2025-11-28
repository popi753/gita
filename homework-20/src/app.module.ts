import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';

// თქვენი დავალება არის წინა 20 დავალებაზე დაამატოთ შემდეგი ფუნცქიონალი.
// 1) დაამატეთ ვალიდაციები იუზერებსაც და ხარჯებსაც(იქსდენსებს),
//  გამოიყენეთ DTO და class-validator, class-transformer

// 2) დაამატეთ ორივე რესურსზე ფეჯინეიშენი, page = 1, take.= 30,
//  არაფერს თუ არ გადასცემთ დიფოლატად პირველი 30 ჩანაწერი უნდა წამოიღოს

// 3) ხარჯებზე გააკეთეთ კატეგორიების ვალიდაცია, გქონდეთ რამე knowCategories და როგორც ლექციაზე ვქენით ან დასერჩეთ როგორ უნდა გააეკთოთ ინამ ველიუების ვალიდაცია class-validator ის გამოყენებით

// 4) იუზერების გეთის დროს გაჰენდლეთ ფილტრები მაგალითად /users?gender=m უნდა დააბრუნოს ყველა მმამრობითი სქესის იუზერი, /users?gender=m&email=test
// უნდა დააბრუნოს ყველა მმარრობითი სქესის იუზერი და დამატებით ყველა ის იუზერი რომლის იმეილიც იწყება test ით.

// 5) დაამატეთ query-ით ფილტრები ასევე ხარჯებზე, კატეგორით მაგალითად, priceFrom. priceTo

@Module({
  imports: [UserModule,ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
