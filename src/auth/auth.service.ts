import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from 'src/users/user.entity'
import { UserService } from '../users/user.service'
import { PasswordService } from './password.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) {}

  async signin(email: string, password: RawPassword): Promise<User> {
    const user = await this.userService.findOneBy({ email })
    if (!user) {
      // TODO: replace with dedicated exception;
      // this exception should only be used by controllers
      throw new NotFoundException()
    }
    if (!this.passwordService.match(password, user.password)) {
      // TODO: replace with dedicated exception;
      // this exception should only be used by controllers
      throw new NotFoundException()
    }
    return user
  }

}
