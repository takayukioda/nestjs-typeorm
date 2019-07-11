import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminUserController } from './admin-user.controller'
import { AdminUser } from './admin-user.entity'
import { AdminUserService } from './admin-user.service'
import { AdminUserRepository } from './admin-user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([AdminUserRepository])],
  providers: [AdminUserService],
  controllers: [AdminUserController],
  exports: [AdminUserService],
})
export class AdminUserModule { }
