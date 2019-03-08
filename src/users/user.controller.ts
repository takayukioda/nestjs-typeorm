import {
  Controller,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
} from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async listUsers(): Promise<User[]> {
    return this.userService.findAll()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(): Promise<User> {
    return this.userService.createUser()
  }
}
