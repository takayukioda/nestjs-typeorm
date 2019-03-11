import { Module } from '@nestjs/common'
import { UserModule } from 'src/users/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PasswordService } from './password.service'

@Module({
  imports: [UserModule],
  providers: [AuthService, PasswordService],
  controllers: [AuthController],
})
export class AuthModule { }
