import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { isAuthGuard } from '../guards/isAuth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { UserId } from '../decorators/user-id.decorator';

// თქვენი დავალებაა წინა 24 დავალებას დაუმატოთ შემდეგი ფუნქციონალი: 

// 1) შემოიტანეთ სისტემაში როლები და უფლებები
// 2) გექნებათ 2 ძირითადი როლი  user და admin
// 3) ადმნის შეუძლია ყველაფერი, სხვა იუზერების წაშლა, სხვისი ხარჯების წაშლა დაედითება, პროდუქტების წაშლა დაედითება და ა.შ.
// 4) გააკეთეთ როლის გარდი და როლის დეკორატორი
// 5) როცა იუზერი დალოგინდება ტოკენში ჩასეტეთ როლი

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post("/signup")
  signUp(@Body() createUserDto:CreateUserDto){
      return this.authService.signUp(createUserDto);
  }
  
  @Post("/signin")
  signIn(@Body() signInDto:SignInDto){
      return this.authService.signIn(signInDto);
  }

  @Get("/profile")
  @UseGuards(isAuthGuard)
  getProfile(@UserId() id:string) {
    console.log("Getting profile for user ID:", id);
      return this.authService.getProfile(id);
  }
}
