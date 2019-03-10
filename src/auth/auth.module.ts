import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PasswordService } from './password.service'
import { UserModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule],
  providers: [AuthService, PasswordService],
  controllers: [AuthController],
})
export class AuthModule { }
