import { forwardRef, Module } from "@nestjs/common";
import { ExpenseController } from "./expenses.controller";
import { ExpenseService } from "./expenses.service";
import { expenseModel } from "./schemas/expense.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../users/users.module";

@Module({
     imports: [
        forwardRef(() => UserModule),
        MongooseModule.forFeature([
          { name: "expense", schema: expenseModel }
        ])],
    controllers:[ExpenseController],
    providers:[ExpenseService],
})
export class ExpensesModule{}