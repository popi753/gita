import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { QueryParamsDto } from "./dto/queryParams.dto";
import { isValidObjectid } from "../common/is-valid-objectId.dto";

// 2) იუზერების შექმნის დროს გადააკეთებთ ლოგიკას რო ყოველი ახალი იუზერის დამატებისას სისტემამ ავტომატურად მიანიჭოს subscriptionStartDate  და subscriptionEndDate, 1 თვე უნდა იყოს ყოველთვის საბსქრიფშენის ვადა.

// 4) იუზერების კონტროლერს დაამატეთ ახალი ენდფოინთი /upgrade-subscription და აქ თუ დაარექუსთებს იუზერი შეამოწმეთ რამდენად ვალიდური იუზერია და თუ ყველაფერი რიგზეა საბსქრიფშენის subscriptionEndDate გაუხანგრძლივეთ კიდევ ერთი თვით.


@Controller("/users")
export class UsersController{
    constructor(private readonly userService: UserService) {}

    @Patch("/upgrade-subscription")
    upgradeSubscription(@Body() {id}: isValidObjectid) {
        console.log(id)
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

    @Get("/:id")
    findOne(@Param() {id} : isValidObjectid){
        return this.userService.findOne(id);
    }

    @Delete("/:id")
    deleteUserById(@Param() {id}:isValidObjectid){
        return this.userService.deleteUserById(id);
    }

    @Patch("/:id")
    updateUserById(@Param() {id}:isValidObjectid, @Body() updateUserDto:UpdateUserDto){
        return this.userService.updateUserById(id, updateUserDto);
    }

    // insert many users at once
    // use once dont repeat
    // @Post("/insertMany")
    // insertMany(){
    //     return this.userService.insertDataToMongoDB();
    // }
}