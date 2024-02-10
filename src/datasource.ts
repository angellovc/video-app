import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();

const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  synchronize: true,
  // name: 'default',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  // subscribers: ['src/subscriber/**/*{.ts,.js}'],
});

export default connectionSource;