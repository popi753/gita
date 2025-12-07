import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { ExpenseService } from "./expenses.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
// import { CreateExpensePipe } from "./pipes/create-expense.pipe";
// import { ExpenseQueryPipe } from "./pipes/expense-query.pipe";
import { QueryParamsDto } from "./dto/queryParams.dto";
import { isValidObjectid } from "../common/is-valid-objectId.dto";

// 1) დაამატეთ ვალიდაციები იუზერებსაც და ხარჯებსაც(იქსდენსებს),
//  გამოიყენეთ DTO და class-validator, class-transformer


// 5) დაამატეთ query-ით ფილტრები ასევე ხარჯებზე, კატეგორით მაგალითად, priceFrom. priceTo

@Controller("/expenses")
export class ExpenseController{
    constructor(private readonly expenseService: ExpenseService) {}

    @Get()
    findAll(@Query() query:QueryParamsDto){
    // findAll(@Query(new ExpenseQueryPipe()) query){
            return this.expenseService.findAll(query);
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
    getExpenseById(@Param() {id}:isValidObjectid){
        return this.expenseService.getExpenseById(id);
    }

    @Delete("/:id")
    deleteExpenseById(@Param() {id}:isValidObjectid){
        return this.expenseService.deleteExpenseById(id);
    }

    @Patch("/:id")
    updateExpenseById(@Param() {id}:isValidObjectid, @Body() updateExpenseDto:UpdateExpenseDto){
        return this.expenseService.updateExpenseById(id, updateExpenseDto);
    }

    // insert many users at once
    // use once dont repeat
    //use users/insertmany first
    // @Post("/insertMany")
    // insertMany(){
    //     return this.expenseService.insertDataToMongoDB();
    // }
}