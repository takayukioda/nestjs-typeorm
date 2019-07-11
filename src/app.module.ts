import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { RouterModule } from 'nest-router'
import { AdminUserModule } from './admin/admin-user/admin-user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { loggerMiddleware } from './middlewares/logger.middleware'
import { routes } from './router'
import { UserModule } from './user/user.module'

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'sample',
  password: '!QAZxsw2',
  database: 'sample',
  entities: [`${__dirname}/**/*.entity.{ts,js}`],
  synchronize: false,
  logging: ['query', 'error'],
}
@Module({
  imports: [
    RouterModule.forRoutes(routes),
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    AuthModule,
    AdminUserModule
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
