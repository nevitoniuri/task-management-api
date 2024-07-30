import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TaskModule,
    DbModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
