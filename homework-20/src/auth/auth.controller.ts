import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { isAuthGuard } from '../guards/isAuth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { UserId } from '../decorators/user-id.decorator';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation} from '@nestjs/swagger';
import { Role } from '../users/schemas/user.schema';

// თქვენი დავალებაა წინა 24 დავალებას დაუმატოთ შემდეგი ფუნქციონალი: 

// 1) შემოიტანეთ სისტემაში როლები და უფლებები
// 2) გექნებათ 2 ძირითადი როლი  user და admin
// 3) ადმნის შეუძლია ყველაფერი, სხვა იუზერების წაშლა, სხვისი ხარჯების წაშლა დაედითება, პროდუქტების წაშლა დაედითება და ა.შ.
// 4) გააკეთეთ როლის გარდი და როლის დეკორატორი
// 5) როცა იუზერი დალოგინდება ტოკენში ჩასეტეთ როლი

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @ApiOperation({ summary: 'Register a new user' })
  @ApiBadRequestResponse({example: {email:"user with this email already exists"}})
  @ApiInternalServerErrorResponse({example: {message:"Internal Server Error"}})
  @ApiCreatedResponse({example: {success:true,newUser:{
                  firstName : "Json",
                  lastName : "Doe",
                  email : "json.doe@example.com",
                  phoneNumber : "1234567890",
                  gender : "Male",
                  role: Role.User,
                  subscriptionStartDate : "2024-01-01T00:00:00.000Z",
                  subscriptionEndDate : "2024-02-01T00:00:00.000Z"
              }}})
  @Post("/signup")
  signUp(@Body() createUserDto:CreateUserDto){
      return this.authService.signUp(createUserDto);
  }

  @ApiOperation({ summary: 'Authenticate user and return JWT token' })
  @ApiNotFoundResponse({example: {user:"user not found"}})
  @ApiBadRequestResponse({example: {body:"invalid credentials"}})
  @ApiInternalServerErrorResponse({example: {message:"Internal Server Error"}})
  @ApiOkResponse({example: {success:true,message:"signin successful",token:"eyJhtGciOiJIUzI1NiIsBnR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTg3OTQ2NSIsImVtYWlsIjoiSm9obkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODgwMjI0MDAsImV4cCI6MTY4ODA1ODgwMH0.DummySignature"}})
  @Post("/signin")
  signIn(@Body() signInDto:SignInDto){
      return this.authService.signIn(signInDto);
  }

  @ApiOperation({ summary: 'Get profile of authenticated user' })
  @ApiOkResponse({example: {success:true,user:{
                  firstName : "Json",
                  lastName : "Doe",
                  email : "json.doe@example.com",
                  phoneNumber : "1234567890",
                  gender : "Male",
                  role: Role.User,
                  subscriptionStartDate : "2024-01-01T00:00:00.000Z",
                  subscriptionEndDate : "2024-02-01T00:00:00.000Z"
              }}})
  @ApiNotFoundResponse({example: {user:"user not found"}})
  @ApiInternalServerErrorResponse({example: {message:"Internal Server Error"}})
  @ApiBearerAuth()
  @Get("/profile")
  @UseGuards(isAuthGuard)
  getProfile(@UserId() id:string) {
      return this.authService.getProfile(id);
  }
}
