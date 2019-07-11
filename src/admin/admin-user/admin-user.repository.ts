import { EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'
import { AdminUser } from './admin-user.entity'

@EntityRepository(AdminUser)
export class AdminUserRepository extends BaseRepository<AdminUser> { }
