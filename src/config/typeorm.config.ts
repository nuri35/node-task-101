import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    if (process.env.NODE_ENV === 'development') {
      return {
        type: this.configService.get<any>('DB_TYPE'),
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        database: this.configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        logging: JSON.parse(this.configService.get<string>('LOGGING')),
        namingStrategy: new SnakeNamingStrategy(),
      };
    } else if (process.env.NODE_ENV === 'production') {
      return {
        type: 'sqlite',
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        database: 'prod.sqlite',
        autoLoadEntities: true,
        migrationsRun: JSON.parse(
          this.configService.get<string>('MIGRATIONS_RUN'),
        ),
        // So this property is going to make sure that all of our different migrations get ran when we are starting up our database
        // ssl: {
        //   rejectUnauthorized: JSON.parse(this.configService.get<string>('SSL')),
        // },
      };
    } else {
      throw new Error('unknown environment');
    }
  }
}
