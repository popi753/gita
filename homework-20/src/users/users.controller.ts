import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { QueryParamsDto } from "./dto/queryParams.dto";
import { isValidObjectid } from "../common/is-valid-objectId.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { get } from "https";
import { isAuthGuard } from "../guards/isAuth.guard";
import { UserId } from "../decorators/user-id.decorator";

// თქვენი დავალებაა წინა 23 დავალებას დაუმატოთ შემდეგი ფუნცქიონალი

// 1) დაამატეთ რეგისტრაცია/ავტორიზაცია JWT ტოკენის გამოყენებით.
// 2) დაამატეთ გარდი და დაიცავით სხვადასხვა როუტები რომ რენდომ იუზერებს არ მიცეთ იმის საშუალება რაც რეგისტრირებულ იუზერებს
// 3) სადაც იუზერების და სხვა რესურსების რეალაცია გაავთ დაამატეთ ლოგიკა რომ იუზერებმა სხვა იუზერების რესურსების წაშლა ან განახლება არ შეძლონ.


@Controller("/users")
export class UsersController{
    constructor(private readonly userService: UserService) {}

    @Patch("/upgrade-subscription")
    @UseGuards(isAuthGuard)
    upgradeSubscription(@UserId() id:string){
        return this.userService.upgradeSubscription(id);
    }

    @Get()
    findAll(@Query() query:QueryParamsDto){
        return this.userService.findAll(query);
    }

    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Post("/signin")
    signin(@Body() signInDto:SignInDto){
        return this.userService.signIn(signInDto);
    }

    @Get("/profile")
    @UseGuards(isAuthGuard)
    getProfile(@UserId() id:string) {
        return this.userService.getProfile(id);
    }

    @Delete()
    @UseGuards(isAuthGuard)
    deleteUserById(@UserId() id:string){
        return this.userService.deleteUserById(id);
    }

    @Patch()
    @UseGuards(isAuthGuard)
    updateUserById(@UserId() id:string, @Body() updateUserDto:UpdateUserDto){
        return this.userService.updateUserById(id, updateUserDto);
    }

    // insert many users at once
    // use once dont repeat
    // @Post("/insertMany")
    // insertMany(){
    //     return this.userService.insertDataToMongoDB();
    // }
}