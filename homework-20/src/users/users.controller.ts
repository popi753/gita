import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { QueryParamsDto } from "./dto/queryParams.dto";
import { isValidObjectid } from "../common/is-valid-objectId.dto";
import { SignInDto } from "../auth/dto/sign-in.dto";
import { isAuthGuard } from "../guards/isAuth.guard";
import { UserId } from "../decorators/user-id.decorator";
import { Gender, Role } from "./schemas/user.schema";
import { RoleGuard } from "../guards/role.guard";
import { GetRole } from "../decorators/role.decorator";
import { ApiQuery, ApiResponse, ApiTags, ApiOperation, ApiOkResponse, ApiUnauthorizedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiParam, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { first } from "rxjs";
import { expense } from "../expenses/schemas/expense.schema";

// მოგესალმებით თქვენი დავალებაა დაამატოთ შემდეგი ფიჩერები წინა ანუ 25 დავალებას.

// 1) დაუმატეთ იუზერებს ახალი ფროფერტი isActive, და დაწერეთ მიგრაცია რომელიც ყველა იუზერის ჩანაწერს დაუმატებს ამ ახალ ფროფერთის შეიძლება ეს იყოს true ან false

// 2) დაამატეთ ახალი ენდფოინთი იქსფენსებზე მაგალითად /statistic და დააბრნეთ კატეგორიის მიხედვით დაჯგუფებული ხარჯები, პლუს დათვალეთ იმ კატეგორიაში რამდენი იყო სრული ხარჯი, რამდენი აითემია თითოეულ ხარჯის კატეგორიაში, და ლექციაზე როგორც ვქენით მასივის სახით ჩანდეს ეს ხარჯები.

// 3) დაამატეთ ახალი ენფოინთი იუზერებზე, დააჯგუფეთ ყველა იუზერი სქესის მიხედვით და გამოთვალეთ საშუალო ასაკი ორივეში.

// 4) ხარჯებზე დაამატეთ ახალი ენდფოინთი /expenses/top-spenders?limit=10 სადაც იუზერებს დააჯგუფებთ userId ების მიხედვით და დაუთვლით მთლიანად რამდენი აქვს დახარჯული.

@Controller("/users")
export class UsersController{
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Upgrade authenticated user subscription' })
    @ApiOkResponse({ description: 'Subscription upgraded', example: "subscription updated" })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiNotFoundResponse({ description: 'User not found', example: { user: "user not found" } })
    @ApiBearerAuth()
    @Patch("/upgrade-subscription")
    @UseGuards(isAuthGuard)
    upgradeSubscription(@UserId() id:string){
        return this.userService.upgradeSubscription(id);
    }

    @ApiOperation({ summary: 'Group users by gender and return average age' })
    @ApiOkResponse({ description: 'Grouped statistics', example: [{ gender: 'male', count: 20, avgAge: 30 }] })
    @Get("/avgAge")
    groupUsersBySex(){
        return this.userService.groupUsersBySex();
    }

    @ApiOperation({ summary: 'List users with pagination and optional filters' })
    @Get()
    @HttpCode(200)
    @ApiOkResponse({ description: 'List of users with pagination', example:{
                    page : 1,
                    take : 10,
                    total : 100,
                    totalPages : 10,
                    data:  [{firstName: "John",
                             lastName: "Doe",
                             email: "john.doe@example.com",
                             phoneNumber: "1234567890",
                             age: 30,
                             gender: "Male",
                             role: "User",
                             subscriptionStartDate: "2023-01-01T00:00:00.000Z",
                             subscriptionEndDate: "2024-01-01T00:00:00.000Z",
                             isActive: true,
                             expenses: ["6482f4e2f0d5c2a1b4e8c9d3"]}],
                }})
    @ApiQuery({name:"page", required:false, type:Number, example:1, default:1})
    @ApiQuery({name:"take", required:false, type:Number, example:30, default:30})
    @ApiQuery({name:"gender", required:false, type:String, example:Gender.Male, enum:Gender})
    @ApiQuery({name:"emailStartsWith", required:false, type:String, example:"john"})
    findAll(@Query() query:QueryParamsDto){
        return this.userService.findAll(query);
    }



    @ApiOperation({ summary: 'Delete a user by id (authenticated + role guard)' })
    @ApiParam({ name: 'userId', required: true, type: String })
    @ApiOkResponse({ description: 'User deleted', example: { success: true, user: {firstName: "John",
                                                                                    lastName: "Doe",
                                                                                    email: "john.doe@example.com",
                                                                                    phoneNumber: "1234567890",
                                                                                    age: 30,
                                                                                    gender: "Male",
                                                                                    role: "User",
                                                                                    subscriptionStartDate: "2023-01-01T00:00:00.000Z",
                                                                                    subscriptionEndDate: "2024-01-01T00:00:00.000Z",
                                                                                    isActive: true,
                                                                                    expenses: ["6482f4e2f0d5c2a1b4e8c9d3"]} } })
    @ApiUnauthorizedResponse({ description: 'Unauthorized', example: 'Token is not provided' })
    @ApiForbiddenResponse({ description: 'Forbidden', example: {error : 'Forbidden'} })
    @ApiNotFoundResponse({ description: 'User not found', example: { user: "user not found" } })
    @ApiBearerAuth()
    @Delete("/:userId")
    @UseGuards(isAuthGuard)
    @UseGuards(RoleGuard)
    deleteUserById(@UserId() id:string, @GetRole(Role) role:Role, @Param("userId") userId:string){
        return this.userService.deleteUserById(id, role,userId);
    }

    @ApiOperation({ summary: 'Update a user by id (authenticated + role guard)' })
    @ApiParam({ name: 'userId', required: true, type: String })
    @ApiBody({ type: UpdateUserDto })
    @ApiOkResponse({ description: 'User updated', example: { success: true, updatedUser : {firstName: "John",
                             lastName: "Doe",
                             email: "john.doe@example.com",
                             phoneNumber: "1234567890",
                             age: 30,
                             gender: "Male",
                             role: "User",
                             subscriptionStartDate: "2023-01-01T00:00:00.000Z",
                             subscriptionEndDate: "2024-01-01T00:00:00.000Z",
                             isActive: true,
                             expenses: ["6482f4e2f0d5c2a1b4e8c9d3"]} } })
    @ApiUnauthorizedResponse({ description: 'Unauthorized', example: 'Token is not provided' })
    @ApiForbiddenResponse({ description: 'Forbidden', example: {error : 'Forbidden'} })
    @ApiNotFoundResponse({ description: 'User not found', example: { user: "user not found" } })
    @ApiBearerAuth()
    @Patch("/:userId")
    @UseGuards(isAuthGuard)
    @UseGuards(RoleGuard)
    updateUserById(@UserId() id:string,@GetRole(Role) role:Role, @Body() updateUserDto:UpdateUserDto, @Param("userId") userId:string){
        return this.userService.updateUserById(id, role, updateUserDto,userId);
    }

    // insert many users at once
    // use once dont repeat
    // @Post("/insertMany")
    // insertMany(){
    //     return this.userService.insertDataToMongoDB();
    // }
}