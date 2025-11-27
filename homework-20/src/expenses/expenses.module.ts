import { Module } from "@nestjs/common";
import { ExpenseController } from "./expenses.controller";
import { ExpenseService } from "./expenses.service";

// 3) უნდა გქონდეთ იქსფენსების მოდული სადაც გააკეთებთ ქრადის ტიპის ოპერაციებს.
//  თითეულ იქსფენსს უნდა ქონდეს შემდეგი ტიპის ფროფერთიები: 
// id-ეს სისტემამ უნდა მიანიჭოს ავტომატურად როგორც შვებით ხოლმე.
//  category, productName, quantity, price, totalPrice-ეს ავტომატურად უნდა გამოითვალოს რაოდენობის და ფასის ხარჯზე.

@Module({
    imports:[],
    controllers:[ExpenseController],
    providers:[ExpenseService],
})
export class ExpensesModule{}