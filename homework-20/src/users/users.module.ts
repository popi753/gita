import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";

// 2) უნდა გქონდეთ იუზერების მოდული სადაც გექნებატ CRUD ტიპის ოპერაციები,
//  თითოეულ იუზერს უნდა ქონდეს შემდგი ტიპის ფროპერთიები: 
// id-ეს სისტემამ უნდა მიანიჭოს ავტომატურად როგორც შვებით ხოლმე. firstName, lastName, email, phoneNumber, gender.

@Module({
    imports:[],
    controllers:[UsersController],
    providers:[UserService],
})
export class UserModule{}