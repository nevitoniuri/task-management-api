import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TaskEntity } from '../task/task.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [TaskEntity, UserEntity],
        // entities: [__dirname + '/entities/**'],
        migrations: [__dirname + '/migrations/*.ts'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
