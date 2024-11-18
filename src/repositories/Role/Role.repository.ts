import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Role } from "./Role.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RoleRepository {
    constructor(
        @InjectRepository(Role)
        private readonly repository: Repository<Role>,
    ) { }
}