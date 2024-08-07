import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './config/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TaskModule,
    DbModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
