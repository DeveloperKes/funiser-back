import { DataSource } from 'typeorm';  //? Importe del Datasource
import { config } from 'dotenv'; //? Importo las variables de entorno
import { Child, Eps, Family, Member, Person, Professional, Role, Session, Token, User } from './repositories';
config()

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        User, Person,
        Child, Token,
        Family, Member,
        Session, Professional,
        Role, Eps
    ],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    subscribers: [],
    migrationsTableName: 'migrations',
    synchronize: false,
});


