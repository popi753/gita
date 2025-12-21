import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ExpenseService } from "./expenses.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
// import { CreateExpensePipe } from "./pipes/create-expense.pipe";
// import { ExpenseQueryPipe } from "./pipes/expense-query.pipe";
import { QueryParamsDto } from "./dto/queryParams.dto";
import { isValidObjectid } from "../common/is-valid-objectId.dto";
import { isAuthGuard } from "../guards/isAuth.guard";
import { UserId } from "../decorators/user-id.decorator";
import { RoleGuard } from "../guards/role.guard";
import { Role } from "../users/schemas/user.schema";
import { GetRole } from "../decorators/role.decorator";
import { ApiOkResponse, ApiQuery, ApiTags, ApiOperation, ApiCreatedResponse, ApiUnauthorizedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiBody, ApiParam, ApiBearerAuth, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { expense } from "./schemas/expense.schema";

// მოგესალმებით თქვენი დავალებაა დაამატოთ შემდეგი ფიჩერები წინა ანუ 27 დავალებას.

// 1) დაუმატეთ იუზერებს ახალი ფროფერტი isActive, და დაწერეთ მიგრაცია რომელიც ყველა იუზერის ჩანაწერს დაუმატებს ამ ახალ ფროფერთის შეიძლება ეს იყოს true ან false

// 2) დაამატეთ ახალი ენდფოინთი იქსფენსებზე მაგალითად /statistic და დააბრნეთ კატეგორიის მიხედვით დაჯგუფებული ხარჯები, პლუს დათვალეთ იმ კატეგორიაში რამდენი იყო სრული ხარჯი, რამდენი აითემია თითოეულ ხარჯის კატეგორიაში, და ლექციაზე როგორც ვქენით მასივის სახით ჩანდეს ეს ხარჯები.

// 3) დაამატეთ ახალი ენფოინთი იუზერებზე, დააჯგუფეთ ყველა იუზერი სქესის მიხედვით და გამოთვალეთ საშუალო ასაკი ორივეში.

// 4) ხარჯებზე დაამატეთ ახალი ენდფოინთი /expenses/top-spenders?limit=10 სადაც იუზერებს დააჯგუფებთ userId ების მიხედვით და დაუთვლით მთლიანად რამდენი აქვს დახარჯული.

@Controller("/expenses")
export class ExpenseController{
    constructor(private readonly expenseService: ExpenseService) {}

    @ApiOperation({ summary: 'Get all expenses with pagination and filters' })
    @ApiQuery({name:'page', required:false, type:Number})
    @ApiQuery({name:'take', required:false, type:Number})
    @ApiQuery({name:'priceTo', required:false, type:Number})
    @ApiQuery({name:'priceFrom', required:false, type:Number})
    @ApiQuery({name:'category', required:false, type:String})
    @ApiOkResponse({ description: 'List of expenses with pagination and filters', example:{
                        page : 1,
                        take : 10,
                        total : 100,
                        totalPages : 10,
                        data:  {productName: "netflix",
                                 category: "entertainment",
                                 quantity: 1,
                                price: 15,
                                userId: "6482f4e2f0d5c2a1b4e8c9d3"}
                    }})
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error', example: { error: 'Internal Server Error' } })
    @Get()
    findAll(@Query() query:QueryParamsDto){
    // findAll(@Query(new ExpenseQueryPipe()) query){
            return this.expenseService.findAll(query);
    }

    @ApiOperation({ summary: 'Get top spenders grouped by user' })
    @ApiOkResponse({ description: 'Top spenders grouped by user',example: [
        {
            userId: "6482f4e2f0d5c2a1b4e8c9d3",
            totalSpent: 100
        }
    ]})
    @Get("/top-spenders")
    getTopSpenders(@Query("limit", new ParseIntPipe({ optional: true })) limit: number = 10){
        return this.expenseService.getTopSpenders(limit);
    }

    @ApiOperation({ summary: 'Get expense statistics grouped by category' })
    @Get("/statistics")
    @ApiOkResponse({ description: 'Expense statistics grouped by category', example: [
        {
            category: "entertainment",
            totalSpent: 100,
            itemCount: 5
        }
    ]})
    getStatistics(){
        return this.expenseService.getStatistics();
    }


    @ApiOperation({ summary: 'Create a new expense' })
    @ApiCreatedResponse({ description: 'Expense created successfully', example: {
        productName: "netflix",
        category: "entertainment",
        quantity: 1,
        price:10,}})
    @ApiBearerAuth()
    @ApiNotFoundResponse({ description: 'User not found', example: { user: "user not found" } })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error', example: { error: 'Internal Server Error' } })
    @ApiBody({ type: CreateExpenseDto })
    @ApiUnauthorizedResponse({ description: 'Unauthorized', example: 'Token is not provided' })
    @Post()
    @UseGuards(isAuthGuard)
    createExpense(@UserId() userId:string,@Body() createExpenseDto: CreateExpenseDto){
        return this.expenseService.createExpense(userId,createExpenseDto);
    }
    // createExpense(@Body(new CreateExpensePipe()) createExpenseDto:CreateExpenseDto){
    //     return this.expenseService.createExpense(createExpenseDto);
    // }
    // createExpense(@Body() createExpenseDto:CreateExpenseDto){
    //     return this.expenseService.createExpense(createExpenseDto);
    // }

    @ApiOperation({ summary: 'Get an expense by id' })
    @ApiParam({ name: 'id', required: true, type: String })
    @ApiOkResponse({ description: 'Expense found', example: {
        productName: "netflix",
        category: "entertainment",
        quantity: 1,
        price:10,}})
    @ApiNotFoundResponse({ description: 'Expense not found', example: { expense: "expense not found" } })
    @Get("/:id")
    getExpenseById(@Param() {id}:isValidObjectid){
        return this.expenseService.getExpenseById(id);
    }

    @ApiOperation({ summary: 'Delete an expense by id (authenticated + role guard)' })
    @ApiParam({ name: 'id', required: true, type: String })
    @ApiOkResponse({ description: 'Expense deleted', example: { success: true, expense: {
        productName: "netflix",
        category: "entertainment",
        quantity: 1,
        price:10,} } })
    @ApiUnauthorizedResponse({ description: 'Unauthorized', example: 'Token is not provided' })
    @ApiForbiddenResponse({ description: 'Forbidden', example: {error : 'Forbidden'} })
    @ApiNotFoundResponse({ description: 'Expense not found', example: { expense: "expense not found" } })
    @ApiBearerAuth()
    @Delete("/:id")
    @UseGuards(isAuthGuard)
    @UseGuards(RoleGuard)
    deleteExpenseById(@UserId() userId:string,@GetRole(Role) role : Role, @Param() {id}:isValidObjectid){
        return this.expenseService.deleteExpenseById(userId,role, id);
    }

    @ApiOperation({ summary: 'Update an expense by id (authenticated + role guard)' })
    @ApiParam({ name: 'id', required: true, type: String })
    @ApiBody({ type: UpdateExpenseDto })
    @ApiOkResponse({ description: 'Expense updated', example: { success: true, updatedExpense: {
        productName: "netflix",
        category: "entertainment",
        quantity: 1,
        price:10,} } })
    @ApiUnauthorizedResponse({ description: 'Unauthorized', example: 'Token is not provided' })
    @ApiForbiddenResponse({ description: 'Forbidden', example: {error : 'Forbidden'} })
    @ApiNotFoundResponse({ description: 'Expense not found', example: { expense: "expense not found" } })
    @ApiBearerAuth()
    @Patch("/:id")
    @UseGuards(isAuthGuard)
    @UseGuards(RoleGuard)
    updateExpenseById(@UserId() userId:string, @GetRole(Role) role : Role,  @Param() {id}:isValidObjectid, @Body() updateExpenseDto:UpdateExpenseDto){
        return this.expenseService.updateExpenseById(userId,role, id, updateExpenseDto);
    }

    // insert many users at once
    // use once dont repeat
    //use users/insertmany first
    // @Post("/insertMany")
    // insertMany(){
    //     return this.expenseService.insertDataToMongoDB();
    // }
}