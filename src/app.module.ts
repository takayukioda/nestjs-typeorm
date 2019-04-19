import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { loggerMiddleware } from './middlewares/logger.middleware'

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'sample',
  password: '1qazXSW@',
  database: 'sample',
  entities: [`${__dirname}/**/*.entity.{ts,js}`],
  synchronize: false,
  logging: ['query', 'error'],
}
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(loggerMiddleware)
      .forRoutes('*')
  }
}
