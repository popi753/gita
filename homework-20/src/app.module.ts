import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';

// მოგესალმებით თქვენი დავალება შემდეგია.
// 1) შექმენით ნესტის აპლიკაცია და დაამატეთ ორი ახალი მოდული.


// ორივე ინფორმაცია შეინახეთ ცვლადებში როგორც ლექციაზე ვქენით

@Module({
  imports: [UserModule,ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
