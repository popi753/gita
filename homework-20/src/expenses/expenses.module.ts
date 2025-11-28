import { Module } from "@nestjs/common";
import { ExpenseController } from "./expenses.controller";
import { ExpenseService } from "./expenses.service";

@Module({
    imports:[],
    controllers:[ExpenseController],
    providers:[ExpenseService],
})
export class ExpensesModule{}