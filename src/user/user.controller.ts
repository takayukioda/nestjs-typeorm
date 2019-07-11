import { Controller, Get } from '@nestjs/common'

@Controller('users')
export class UserController {

  @Get('')
  async listUsers(): Promise<string[]> {
    return ['a', 'user']
  }
}
