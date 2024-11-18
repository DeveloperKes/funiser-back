import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { userRegisterDTO, UserResponseDTO } from "src/dtos";
import { Person, PersonRepository, User, UserRepository } from "src/repositories";
import { DataSource } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRespository: UserRepository,
        private readonly personRepository: PersonRepository,
        private readonly dataSource: DataSource
    ) { }

    async register(data: userRegisterDTO): Promise<UserResponseDTO> {
        return await this.dataSource.transaction(async (manager) => {
            let userData: User = new User();
            Object.assign(userData, data);
            const user = this.userRespository.createUser(userData);
            await manager.save(user);

            let personData: Person = new Person();
            Object.assign(personData, { ...data, id: data.document, user });
            const person = this.personRepository.createPerson(personData);

            await manager.save(person);
            return plainToInstance(UserResponseDTO, { ...user, ...person, document: person.id });
        });
    }
}