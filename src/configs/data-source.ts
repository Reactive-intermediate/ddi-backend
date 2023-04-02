import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: [],
  // migrations: ['dist/migrations/*.js'],
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...dataSourceOptions,
  autoLoadEntities: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
