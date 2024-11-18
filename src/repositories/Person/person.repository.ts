import { Repository } from "typeorm";
import { Person } from "./Person.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class PersonRepository {
    constructor(
        @InjectRepository(Person)
        private readonly repository: Repository<Person>,
    ) { }

    createPerson = this.repository.create;
}