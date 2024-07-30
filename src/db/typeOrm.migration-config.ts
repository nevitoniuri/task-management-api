import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TaskEntity } from '../task/task.entity';
import { UserEntity } from '../user/user.entity';

config();
const configService = new ConfigService();
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [TaskEntity, UserEntity],
  migrations: [__dirname + '/migrations/*.ts'],
};

export default new DataSource(dataSourceOptions);
