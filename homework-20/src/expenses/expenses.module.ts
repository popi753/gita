import { forwardRef, Module } from "@nestjs/common";
import { ExpenseController } from "./expenses.controller";
import { ExpenseService } from "./expenses.service";
import { expenseModel } from "./schemas/expense.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../users/users.module";
import { userModel } from "../users/schemas/user.schema";

@Module({
     imports: [
        forwardRef(() => UserModule),
        MongooseModule.forFeature([
          { name: "expense", schema: expenseModel },
          { name: "user", schema: userModel }

        ])],
        
    controllers:[ExpenseController],
    providers:[ExpenseService],
})
export class ExpensesModule{}