import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// მოგესალმებით თქვენი დავალებაა შექმნათ ახალი ნესტის პროექტი და დააინტეგრიროთ შემდეგი ფუნქციები.

// 1) შექმენით იუზერების ქრადი და ბაზაში დაამატეთ 30_000 იუზერი ფეიქეირს გამოყენებით.

// 2)დაამატეთ მორგანი, ნახეთ რა დრო ჭირდება თითოეულ რექუესთს.

// 3) დაამატეთ ახალი ენდფოინთი რომელიც დაგიბრუნებთ სულ რამდენი იუზრია ბაზაში. /total-users

// 4) ასაკზე დაადეთ ინდექსი და დაამატეთ ახალი ენდფოინთი რომესაც გადასცემთ ასაკს, თუ მხოლოდ ასაკი გადაეცით დაგიბრუნებთ იმ ასაკის ადამიანებს, 
// თუ გადაეცით ageFrom და ageTo შესაბამისად გაფილტრავს ასაკის მიხედვით იუზერებს და დააბრუნებს. ასევე გაფილტერთ gender=m სქესის მიხედვით ფილტრი. დაამატეთ სახელის მიხედვით სერჩი, regex ის გამოყენებით.

// 5)  დაამტეთ იუზერების რესურსზე ფეჯინეიშენი, შეზღუდეთ ზედა/ქვედა ლიმიტი.
// მინიშნება უნდა გამოიყენოთ model.find().skip().limit() ეს ორი მეთოდი შიგნით რაღაც უნდა ჩაწეროთ რიცხცვები ეგ თქვენზე მომინდია

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL!),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
