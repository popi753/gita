import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { QueryParamsDto } from "./dto/queryParams.dto";

// 2) იუზერების შექმნის დროს გადააკეთებთ ლოგიკას რო ყოველი ახალი იუზერის დამატებისას სისტემამ ავტომატურად მიანიჭოს subscriptionStartDate  და subscriptionEndDate, 1 თვე უნდა იყოს ყოველთვის საბსქრიფშენის ვადა.

// 4) იუზერების კონტროლერს დაამატეთ ახალი ენდფოინთი /upgrade-subscription და აქ თუ დაარექუსთებს იუზერი შეამოწმეთ რამდენად ვალიდური იუზერია და თუ ყველაფერი რიგზეა საბსქრიფშენის subscriptionEndDate გაუხანგრძლივეთ კიდევ ერთი თვით.


@Controller("/users")
export class UsersController{
    constructor(private readonly userService: UserService) {}

    @Patch("/upgrade-subscription")
    upgradeSubscription(@Body("userId", ParseIntPipe) userId: number) {
        console.log(userId)
        return this.userService.upgradeSubscription(userId);
    }

    @Get()
    getAllUsers(@Query() query:QueryParamsDto){
        return this.userService.getAllUsers(query);
    }

    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Get("/:id")
    getUserById(@Param("id", ParseIntPipe) id:number){
        return this.userService.getUserById(id);
    }

    @Delete("/:id")
    deleteUserById(@Param("id", ParseIntPipe) id:string){
        return this.userService.deleteUserById(Number(id));
    }

    @Patch("/:id")
    updateUserById(@Param("id", ParseIntPipe) id:string, @Body() updateUserDto:UpdateUserDto){
        return this.userService.updateUserById(Number(id), updateUserDto);
    }
}