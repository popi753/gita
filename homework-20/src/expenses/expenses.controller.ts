import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ExpenseService } from "./expenses.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Controller("/expenses")
export class ExpenseController{
    constructor(private readonly expenseService: ExpenseService) {}

    @Get()
    getAllExpenses(){
        return this.expenseService.getAllExpenses();
    }

    @Post()
    createExpense(@Body() createExpenseDto:CreateExpenseDto){
        return this.expenseService.createExpense(createExpenseDto);
    }

    @Get("/:id")
    getExpenseById(@Param("id") id:string){
        return this.expenseService.getExpenseById(Number(id));
    }

    @Delete("/:id")
    deleteExpenseById(@Param("id") id:string){
        return this.expenseService.deleteExpenseById(Number(id));
    }

    @Patch("/:id")
    updateExpenseById(@Param("id") id:string, @Body() updateExpenseDto:UpdateExpenseDto){
        return this.expenseService.updateExpenseById(Number(id), updateExpenseDto);
    }
}