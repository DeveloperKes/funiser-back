import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import  { config } from 'dotenv';
import { Eps } from './entity/Eps';
import { Professional } from './entity/Professional';
import { Person } from './entity/Person';
import { Program } from './entity/Program';
import { Role } from './entity/Role';
import { Token } from './entity/Token';
import { User } from './entity/User';
import { Session } from './entity/Sessions';
import { Family_member } from './entity/Family_member';
import { Family } from './entity/Family';
import { Child } from './entity/Child';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Child, Eps, Family, Family_member, Session, User, Token, Role, Program, Professional, Person],
      synchronize: true,
      migrations: [__dirname + '/../migration/**/*.ts'],
      subscribers: [],
      migrationsTableName: 'migrations',
    }),
  ],
})

export class AppModule { }