import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { userModel } from "./schemas/user.schema";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:"user", schema: userModel}
        ])
    ],
    controllers:[UsersController],
    providers:[UserService],
    exports:[UserService]
})
export class UserModule{}