import { Body, ClassSerializerInterceptor, Controller, Post, Req, UseInterceptors } from '@nestjs/common'
import { Request } from 'express'
import { RawPassword } from 'src/type'
import { User } from 'src/user/user.entity'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signup(
    @Req() req: Request,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: RawPassword,
  ): Promise<User> {
    return this.authService.signup(name, email, password)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signin')
  async signin(@Body('email') email: string, @Body('password') password: RawPassword): Promise<User> {
    return this.authService.signin(email, password)
  }

}
