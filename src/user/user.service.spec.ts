import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { HashedPassword } from 'src/type'
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'

describe('UserService', () => {
  let module: TestingModule
  let service: UserService

  beforeAll(async () => {
    initializeTransactionalContext()

    const testdbconf: TypeOrmModuleOptions = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sample',
      password: '1qazXSW@',
      database: 'sample',
      entities: [`${__dirname}/../**/*.entity.{ts,js}`],
      synchronize: false,
      logging: ['query', 'error'],
    }

    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testdbconf),
        TypeOrmModule.forFeature([UserRepository])
      ],
      providers: [UserService],
    }).compile()

    service = module.get(UserService)
  })
  afterAll(async () => {
    module.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createUser', () => {
    it('should success', async () => {
      const key = Date.now()
      const newUser = await service.createUser({
        email: `test.${key}@example.com`,
        name: `tester.${key}`,
        password: `${key}` as HashedPassword,
      })
      expect(newUser).toBeDefined()
    })
  })
})
