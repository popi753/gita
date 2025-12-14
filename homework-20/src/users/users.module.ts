import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { userModel } from "./schemas/user.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:"user", schema: userModel}
        ]),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
        })
       
    ],
    controllers:[UsersController],
    providers:[UserService],
    exports:[UserService]
})
export class UserModule{}