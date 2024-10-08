import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { Eps } from './Entities/Eps';
import { Professional } from './Entities/Professional';
import { Person } from './Entities/Person';
import { Program } from './Entities/Program';
import { Role } from './Entities/Role';
import { Token } from './Entities/Token';
import { User } from './Entities/User';
import { Session } from './Entities/Sessions';
import { Family_member } from './Entities/Family_member';
import { Family } from './Entities/Family';
import { Child } from './Entities/Child';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
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