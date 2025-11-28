import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { ExpenseService } from "./expenses.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
// import { CreateExpensePipe } from "./pipes/create-expense.pipe";
// import { ExpenseQueryPipe } from "./pipes/expense-query.pipe";
import { QueryParamsDto } from "./dto/queryParams.dto";

// 1) დაამატეთ ვალიდაციები იუზერებსაც და ხარჯებსაც(იქსდენსებს),
//  გამოიყენეთ DTO და class-validator, class-transformer


// 5) დაამატეთ query-ით ფილტრები ასევე ხარჯებზე, კატეგორით მაგალითად, priceFrom. priceTo

@Controller("/expenses")
export class ExpenseController{
    constructor(private readonly expenseService: ExpenseService) {}

    @Get()
    getAllExpenses(@Query() query:QueryParamsDto){
    // getAllExpenses(@Query(new ExpenseQueryPipe()) query){
            return this.expenseService.getAllExpenses(query);
    }

    @Post()
    createExpense(@Body() createExpenseDto: CreateExpenseDto){
        return this.expenseService.createExpense(createExpenseDto);
    }
    // createExpense(@Body(new CreateExpensePipe()) createExpenseDto:CreateExpenseDto){
    //     return this.expenseService.createExpense(createExpenseDto);
    // }
    // createExpense(@Body() createExpenseDto:CreateExpenseDto){
    //     return this.expenseService.createExpense(createExpenseDto);
    // }

    @Get("/:id")
    getExpenseById(@Param("id", ParseIntPipe) id:number){
        return this.expenseService.getExpenseById(id);
    }

    @Delete("/:id")
    deleteExpenseById(@Param("id", ParseIntPipe) id:string){
        return this.expenseService.deleteExpenseById(Number(id));
    }

    @Patch("/:id")
    updateExpenseById(@Param("id", ParseIntPipe) id:string, @Body() updateExpenseDto:UpdateExpenseDto){
        return this.expenseService.updateExpenseById(Number(id), updateExpenseDto);
    }
}