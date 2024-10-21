import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import  { config } from 'dotenv';
import { Eps } from './Entity/Eps';
import { Professional } from './Entity/Professional';
import { Person } from './Entity/Person';
import { Program } from './Entity/Program';
import { Role } from './Entity/Role';
import { Token } from './Entity/Token';
import { User } from './Entity/User';
import { Session } from './Entity/Sessions';
import { Family_member } from './Entity/Family_member';
import { Family } from './Entity/Family';
import { Child } from './Entity/Child';
import { ChildrenModule } from './children/children-module.module';
import { ChildrenService } from './children/children.service';
import { EpsController } from './eps/eps.controller';
import { EpsService } from './eps/eps.service';
import { EpsModule } from './eps/eps.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { FamilyModule } from './Family/family.module';
import { ProfessionalModule } from './professional/professional.module';
import { RolesModule } from './roles/roles.module';
import { RolesService } from './roles/roles.service';
import { FamilyService } from './Family/family.service';
import { ProfessionalService } from './professional/professional.service';
import { ChildrenController } from './children/children-controller';
import { FamilyController } from './Family/family.controller';
import { ProfessionalController } from './professional/professional.controller';
import { RolesController } from './roles/roles.controller';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Child,  
        Eps,
        Family,
        Family_member,
        Session,
        User,
        Token,
        Role,
        Program,
        Professional,
        Person,
      ],
      synchronize: true,
      logging: true,
      migrations: [__dirname + '/../migration/**/*.ts'],
      subscribers: [],
      migrationsTableName: 'migrations',
    }),
    ChildrenModule,
    EpsModule,
    UserModule,
    FamilyModule,
    ProfessionalModule,
    RolesModule
  ],
  providers: [ChildrenService, EpsService, UserService, FamilyService,ProfessionalService, RolesService],
  controllers: [EpsController, UserController, ChildrenController, FamilyController, ProfessionalController, RolesController],
})

export class AppModule {}

