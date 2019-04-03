import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'
import { AuthModule } from 'src/auth/auth.module'
import { AuthService } from 'src/auth/auth.service'
import { RawPassword } from 'src/type'

describe('Auth Endpoints', () => {
  let app: INestApplication
  const mockAuthService = {
    signup: (name: string, email: string, password: RawPassword) =>
      ({
        name,
        email,
        password: 'hashed password',
        id: '2',
        createdAt: '2019-03-12T22:40:07.244Z',
        updatedAt: '2019-03-12T22:40:07.244Z'
      }),
    signin: (email: string, password: RawPassword) =>
    ({
      id: '2',
      name: 'joe',
      email: 'email',
      createdAt: '2019-03-12T22:40:07.244Z',
      updatedAt: '2019-03-12T22:40:07.244Z'
    })
  }

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
    })
    .overrideProvider(AuthService)
    .useValue(mockAuthService)
    .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/auth/signup (POST)', async () =>
    request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'Crouch',
        email: 'john@crouch.run',
        password: 'something'
      })
      .expect(201)
      .expect(mockAuthService.signup(
         'Crouch',
         'john@crouch.run',
         'password' as RawPassword
      ))
  )

  it('/auth/signin (POST)', async () =>
  request(app.getHttpServer())
    .post('/auth/signin')
    .send({
      email: 'john@crouch.run',
      password: 'password'
    })
    .expect(201)
    .expect(mockAuthService.signin(
      'john@crouch.run',
      'password' as RawPassword
    ))
  )

  afterAll(async () => {
    await app.close()
  })
})
