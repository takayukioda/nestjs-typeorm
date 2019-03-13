import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './user.entity'
import { RawPassword } from 'src/type'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const now = Date.now()
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          // ToDo: Make it more nicer, wrap with gentle utility
          provide: getRepositoryToken(User),
          useValue: {
            _mock: {
              id: 1,
              email: 'initial-user@test.com',
              password: 'password' as RawPassword,
              name: 'initial-user',
              createdAt: now,
              updatedAt: now,
            },
            find() {
              return this._mock
            },
          }
        },

      ],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
