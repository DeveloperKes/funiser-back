import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv";
import { PersonModule, UserModule } from "./modules";
import { Child, Eps, Family, Member, Person, Professional, Role, Session, Token, User } from "./repositories";

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Person,
        Role,
        Child,
        Token,
        Family,
        Member,
        Eps,
        Professional,
        Session
      ],
      synchronize: false,
      logging: true,
      migrations: [__dirname + '/../migration/**/*.ts'],
      subscribers: [],
      migrationsTableName: 'migrations',
    }),
    UserModule,
    PersonModule
  ],
  providers: [],
  controllers: [],
})

export class AppModule { }

