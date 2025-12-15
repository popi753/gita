import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from '../users/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

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
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
