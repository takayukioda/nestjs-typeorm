import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'sample',
  password: '1qazXSW@',
  database: 'sample',
  entities: [`${__dirname}/**/*.entity.{ts,js}`],
  synchronize: true,
}
@Module({
  imports: [TypeOrmModule.forRoot(ormconfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
