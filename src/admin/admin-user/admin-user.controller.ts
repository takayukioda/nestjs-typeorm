import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { AdminUser } from './admin-user.entity'
import { AdminUserService } from './admin-user.service'

@Controller('users')
export class AdminUserController {
  constructor(private readonly service: AdminUserService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async listAdminUsers(): Promise<AdminUser[]> {
    return this.service.findAll()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getAdminUser(@Param('id') id: number): Promise<AdminUser> {
    return this.service.findOne(id)
  }
}
