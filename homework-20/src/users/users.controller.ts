import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { QueryParamsDto } from "./dto/queryParams.dto";
import { isValidObjectid } from "../common/is-valid-objectId.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { isAuthGuard } from "../guards/isAuth.guard";
import { UserId } from "../decorators/user-id.decorator";
import { Role } from "./schemas/user.schema";
import { RoleGuard } from "../guards/role.guard";
import { GetRole } from "../decorators/role.decorator";

// თქვენი დავალებაა წინა 24 დავალებას დაუმატოთ შემდეგი ფუნქციონალი: 

// 1) შემოიტანეთ სისტემაში როლები და უფლებები
// 2) გექნებათ 2 ძირითადი როლი  user და admin
// 3) ადმნის შეუძლია ყველაფერი, სხვა იუზერების წაშლა, სხვისი ხარჯების წაშლა დაედითება, პროდუქტების წაშლა დაედითება და ა.შ.
// 4) გააკეთეთ როლის გარდი და როლის დეკორატორი
// 5) როცა იუზერი დალოგინდება ტოკენში ჩასეტეთ როლი

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