import { Module } from '@nestjs/common'
import { AdminUserController } from './admin-user.controller'

@Module({
  controllers: [AdminUserController],
})
export class AdminUserModule { }
