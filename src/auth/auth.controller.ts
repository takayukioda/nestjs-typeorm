import { ClassSerializerInterceptor, Controller, Post, UseInterceptors, Body, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from 'src/users/user.entity';
import { RawPassword } from 'src/type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signup(@Req() req, @Body('name') name: string, @Body('email') email: string, @Body('password') password: RawPassword): Promise<User> {
    return this.authService.signup(name, email, password)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signin')
  async signin(@Body('email') email: string, @Body('pasword') password: RawPassword): Promise<User> {
    return this.authService.signin(email, password)
  }

}
