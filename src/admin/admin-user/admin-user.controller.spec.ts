import { Test, TestingModule } from '@nestjs/testing'
import { AdminUserController } from './admin-user.controller'
import { AdminUserService } from './admin-user.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { AdminUser } from './admin-user.entity'
import { RawPassword } from 'src/type'

describe('AdminUserController', () => {
  let app: TestingModule

  beforeAll(async () => {
    const now = Date.now()
    app = await Test.createTestingModule({
      controllers: [AdminUserController],
      providers: [
        AdminUserService,
        {
          // ToDo: Make it more nicer, wrap with gentle utility
          provide: getRepositoryToken(AdminUser),
          useValue: {
            _mock: {
              id: 1,
              email: 'initial-AdminUser@test.com',
              password: 'password' as RawPassword,
              name: 'initial-AdminUser',
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

  describe('listAdminUsers()', () => {
    it('should return empty array', async () => {
      const controller = app.get(AdminUserController)
      await expect(controller.listAdminUsers()).resolves.toBeDefined()
    })
  })

  describe('getAdminUser()', () => {
    it('returns a AdminUser', async () => {
      const controller = app.get(AdminUserController)
      await expect(controller.getAdminUser(1)).resolves.toBeDefined()
    })
  })
})
