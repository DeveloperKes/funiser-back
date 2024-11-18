import { Repository, SelectQueryBuilder } from "typeorm";
import { User } from "./User.entity";
import { userFiltersDTO } from "src/dtos/User/Request/UserFilter.dto";
import { UserResponseDTO } from "src/dtos/User/Response/UserResponseDTO";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

export enum UserFilters {
    username = "username",
    id = "id",
    document = "id",
    firstname = "firstname",
    lastname = "lastname",
    email = "email",
    phone = "phone"
}
@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {
    }
    /**
     * Busca usuarios en la base de datos que coincidan con los criterios de filtro proporcionados.
     * 
     * @param {userFiltersDTO} filter - Objeto que contiene los criterios de filtro para consultar usuarios.
     * @returns {Promise<User[]>} - Una promesa que se resuelve en un array de entidades User que coinciden con los criterios de filtro.
     */
    async findByFilter(filter: userFiltersDTO): Promise<User[]> {
        const queryBuilder = this.repository.createQueryBuilder('user')
            .leftJoinAndSelect("user.person", "person");

        for (const [key, value] of Object.entries(filter)) this.applyFilter(queryBuilder, key as UserFilters, value);

        return queryBuilder.getMany();
    }
    /**
     * Aplica un filtro al `queryBuilder` basado en el tipo y valor proporcionados.
     * 
     * @private
     * @param {SelectQueryBuilder<User>} queryBuilder - La instancia del constructor de consultas para construir consultas SQL.
     * @param {UserFilters} type - El tipo de filtro a aplicar.
     * @param {string} [value] - El valor por el cual filtrar.
     */
    private applyFilter(queryBuilder: SelectQueryBuilder<User>, type: UserFilters, value?: string) {
        if (value) queryBuilder.andWhere(`user.${type} ILIKE :${type}`, { [type]: `%${value}%` });
    }
    /**
      * Busca un usuario en la base de datos por su dirección de correo electrónico.
      * 
      * @param {string} email - La dirección de correo electrónico a buscar.
      * @returns {Promise<User>} - Una promesa que se resuelve en una entidad User que coincide con el correo electrónico.
      */
    async findByEmail(email: string): Promise<User> {
        return this.repository.findOne({
            where: { email },
            relations: ['person', 'person.role']
        });
    }
    /**
       * Recupera todos los usuarios de la base de datos, incluyendo sus entidades asociadas de persona y rol.
       * 
       * @returns {Promise<User[]>} - Una promesa que se resuelve en un array de entidades User.
       */
    async findAll(): Promise<User[]> {
        return this.repository.find({ relations: ['person', 'person.role'] });
    }

    // async createUser(user: User): Promise<User> {
    //     return this.repository.create(user);
    // }

    createUser = this.repository.create;
}