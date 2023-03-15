/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('POSTGRES_HOST'),
      username: this.config.get<string>('POSTGRES_USER'),
      password: this.config.get<string>('POSTGRES_PASSWORD'),
      database: this.config.get<string>('POSTGRES_DB'),
      port: this.config.get<number>('POSTGRES_PORT'),
      entities: [ __dirname + 'dist/**/*.entity{.ts,.js}' ],
      synchronize: true,
      autoLoadEntities: true,
    }
  };
}
