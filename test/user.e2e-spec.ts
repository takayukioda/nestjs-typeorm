import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'

describe('Users (e2e)', () => {
  let app: INestApplication
  const mockUserService = {
    findAll: () => ['mockUser1', 'mockUser2'],
    findOne: (findId: number) => ('mockUser1')
  }

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule, UserModule]
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/users (GET)', async () =>
    request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(mockUserService.findAll())
    )

  it('/users/:id (GET)', async () =>
    request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect(mockUserService.findOne(1))
    )

  afterAll(async () => {
    await app.close()
  })
})
