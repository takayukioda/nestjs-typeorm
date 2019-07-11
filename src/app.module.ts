import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { RouterModule } from 'nest-router'
import { AdminUserModule } from './admin/admin-user/admin-user.module'
import { loggerMiddleware } from './middlewares/logger.middleware'
import { routes } from './router'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    UserModule,
    AdminUserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(loggerMiddleware)
      .forRoutes('*')
  }
}
