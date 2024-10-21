import { DataSource } from 'typeorm';  //? Importe del Datasource
import { User } from './Entity/User';
import { Person } from './Entity/Person';
import { Role } from './Entity/Role';
import { Token } from "./Entity/Token";
import { Professional } from "./Entity/Professional";
import { Session } from "./Entity/Sessions";
import { Child } from "./Entity/Child";
import { Eps } from "./Entity/Eps";
import { Family_member } from "./Entity/Family_member";
import { Family } from "./Entity/Family";
import { Program } from "./Entity/Program";

import { config } from 'dotenv'; //? Importo las variables de entorno
config()

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Child, Eps, Family, Family_member, Session, User, Token, Role, Program, Professional, Person],
    migrations: [__dirname + '/../migration/**/*.ts'],
    subscribers: [],
    migrationsTableName: 'migrations',
    synchronize: false,
});


