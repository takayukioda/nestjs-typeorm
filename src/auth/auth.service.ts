import { Injectable, NotFoundException } from '@nestjs/common'
import { HashedPassword, RawPassword } from 'src/type'
import { UserCreateDto } from 'src/users/user.dto'
import { User } from 'src/users/user.entity'
import { UserService } from '../users/user.service'
import { PasswordService } from './password.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) { }

  async signup(name: string, email: string, password: RawPassword): Promise<User> {
    const hashedPassword = this.passwordService.hash(password)
    const dto: UserCreateDto = new UserCreateDto(name, email, hashedPassword)
    return this.userService.createUser(dto)
  }

  async signin(email: string, password: RawPassword): Promise<User> {
    const user = await this.userService.findOneBy({ email })
    if (!user) {
      // TODO: replace with dedicated exception;
      // this exception should only be used by controllers
      throw new NotFoundException()
    }
    if (!this.passwordService.match(password, user.password as HashedPassword)) {
      // TODO: replace with dedicated exception;
      // this exception should only be used by controllers
      throw new NotFoundException()
    }
    return user
  }

}
