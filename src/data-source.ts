import { DataSource, DataSourceOptions } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'dev.sqlite',
  entities: ['**/*.entity{.js,.ts}'],
} as DataSourceOptions);
