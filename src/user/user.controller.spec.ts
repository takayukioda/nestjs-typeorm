import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './user.entity'
import { RawPassword } from 'src/type'

describe('UserController', () => {
  let app: TestingModule

  beforeAll(async () => {
    const now = Date.now()
    app = await Test.createTestingModule({
      controllers: [UserController],
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
            findOne() {
              return this._mock
            }
          }
        },
      ],
    }).compile()
  })

  describe('listUsers()', () => {
    it('should return empty array', async () => {
      const userController = app.get<UserController>(UserController)
      await expect(userController.listUsers()).resolves.toBeDefined()
    })
  })

  describe('getUser()', () => {
    it('returns a user', async () => {
      const userController = app.get<UserController>(UserController)
      await expect(userController.getUser(1)).resolves.toBeDefined()
    })
  })
})
