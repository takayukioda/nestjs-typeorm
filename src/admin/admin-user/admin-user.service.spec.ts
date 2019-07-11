import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { HashedPassword } from 'src/type'
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked'
import { AdminUserRepository } from './admin-user.repository'
import { AdminUserService } from './admin-user.service'

describe('AdminUserService', () => {
  let module: TestingModule
  let service: AdminUserService

  beforeAll(async () => {
    initializeTransactionalContext()

    const testdbconf: TypeOrmModuleOptions = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sample',
      password: '!QAZxsw2',
      database: 'sample',
      entities: [`${__dirname}/../**/*.entity.{ts,js}`],
      synchronize: false,
      logging: ['query', 'error'],
    }

    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testdbconf),
        TypeOrmModule.forFeature([AdminUserRepository])
      ],
      providers: [AdminUserService],
    }).compile()

    service = module.get(AdminUserService)
  })
  afterAll(async () => {
    module.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createAdminUser', () => {
    it('should success', async () => {
      const key = Date.now()
      const newAdminUser = await service.createAdminUser({
        email: `test.${key}@example.com`,
        name: `tester.${key}`,
        password: `${key}` as HashedPassword,
      })
      expect(newAdminUser).toBeDefined()
    })
  })
})
