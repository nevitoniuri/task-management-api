import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

config(); //TODO: retirar
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

export default new DataSource(dataSourceOptions);
