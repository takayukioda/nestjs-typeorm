import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common'

@Controller('users')
export class AdminUserController {

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async listAdminUsers(): Promise<string[]> {
    return ['an', 'admin', 'user']
  }
}
