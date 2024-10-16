import { DataSource } from 'typeorm';  //? Importe del Datasource
import { User } from './entity/User';
import { Person } from './entity/Person';
import { Role } from './entity/Role';
import { Token } from "./entity/Token";
import { Professional } from "./entity/Professional";
import { Session } from "./entity/Sessions";
import { Child } from "./entity/Child";
import { Eps } from "./entity/Eps";
import { Family_member } from "./entity/Family_member";
import { Family } from "./entity/Family";
import { Program } from "./entity/Program";

import { config } from 'dotenv'; //? Importo las variables de entorno
config()

const AppDataSource = new DataSource({
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
});

export default AppDataSource;
