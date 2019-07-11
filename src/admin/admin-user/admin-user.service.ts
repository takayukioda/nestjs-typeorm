import { Injectable } from '@nestjs/common'
import { FindConditions } from 'typeorm'
import { Transactional } from 'typeorm-transactional-cls-hooked'
import { AdminUserCreateDto } from './admin-user.dto'
import { AdminUser } from './admin-user.entity'
import { AdminUserRepository } from './admin-user.repository'

@Injectable()
export class AdminUserService {
  constructor(
    private readonly AdminUserRepository: AdminUserRepository,
  ) { }

  @Transactional()
  async createAdminUser(dto: AdminUserCreateDto): Promise<AdminUser> {
    return this.AdminUserRepository.save(dto)
  }

  @Transactional()
  async findAll(): Promise<AdminUser[]> {
    return this.AdminUserRepository.find()
  }

  @Transactional()
  async findOneBy(conditions: FindConditions<AdminUser>): Promise<AdminUser> {
    return this.AdminUserRepository.findOne(conditions)
  }

  @Transactional()
  async findOne(id: number): Promise<AdminUser> {
    return this.AdminUserRepository.findOne(id)
  }
}
