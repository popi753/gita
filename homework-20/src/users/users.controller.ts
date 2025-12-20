import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { QueryParamsDto } from "./dto/queryParams.dto";
import { isValidObjectid } from "../common/is-valid-objectId.dto";
import { SignInDto } from "../auth/dto/sign-in.dto";
import { isAuthGuard } from "../guards/isAuth.guard";
import { UserId } from "../decorators/user-id.decorator";
import { Role } from "./schemas/user.schema";
import { RoleGuard } from "../guards/role.guard";
import { GetRole } from "../decorators/role.decorator";

// მოგესალმებით თქვენი დავალებაა დაამატოთ შემდეგი ფიჩერები წინა ანუ 27 დავალებას.

// 1) დაუმატეთ იუზერებს ახალი ფროფერტი isActive, და დაწერეთ მიგრაცია რომელიც ყველა იუზერის ჩანაწერს დაუმატებს ამ ახალ ფროფერთის შეიძლება ეს იყოს true ან false

// 2) დაამატეთ ახალი ენდფოინთი იქსფენსებზე მაგალითად /statistic და დააბრნეთ კატეგორიის მიხედვით დაჯგუფებული ხარჯები, პლუს დათვალეთ იმ კატეგორიაში რამდენი იყო სრული ხარჯი, რამდენი აითემია თითოეულ ხარჯის კატეგორიაში, და ლექციაზე როგორც ვქენით მასივის სახით ჩანდეს ეს ხარჯები.

// 3) დაამატეთ ახალი ენფოინთი იუზერებზე, დააჯგუფეთ ყველა იუზერი სქესის მიხედვით და გამოთვალეთ საშუალო ასაკი ორივეში.

// 4) ხარჯებზე დაამატეთ ახალი ენდფოინთი /expenses/top-spenders?limit=10 სადაც იუზერებს დააჯგუფებთ userId ების მიხედვით და დაუთვლით მთლიანად რამდენი აქვს დახარჯული.

@Controller("/users")
export class UsersController{
    constructor(private readonly userService: UserService) {}

    @Patch("/upgrade-subscription")
    @UseGuards(isAuthGuard)
    upgradeSubscription(@UserId() id:string){
        return this.userService.upgradeSubscription(id);
    }

    @Get("/avgAge")
    groupUsersBySex(){
        return this.userService.groupUsersBySex();
    }

    @Get()
    findAll(@Query() query:QueryParamsDto){
        return this.userService.findAll(query);
    }


    @Delete("/:userId")
    @UseGuards(isAuthGuard)
    @UseGuards(RoleGuard)
    deleteUserById(@UserId() id:string, @GetRole(Role) role:Role, @Param("userId") userId:string){
        return this.userService.deleteUserById(id, role,userId);
    }

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