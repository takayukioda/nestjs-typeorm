import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PasswordService } from './password.service'

@Module({
  providers: [AuthService, PasswordService],
})
export class AuthModule { }
