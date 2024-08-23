import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './config/logging.interceptor';
import * as fs from 'fs';
import * as yaml from 'yaml';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => {
          const configFile = fs.readFileSync('config.yaml', 'utf8');
          return yaml.parse(configFile);
        },
      ],
    }),
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
