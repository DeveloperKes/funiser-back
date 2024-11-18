import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { userFiltersDTO, UserResponseDTO } from "src/dtos";
import { UserRepository } from "src/repositories";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async findByFilter(filter: userFiltersDTO): Promise<UserResponseDTO[]> {
        const users = await this.userRepository.findByFilter(filter);
        return plainToInstance(UserResponseDTO, users);
    }

    async findAll(): Promise<UserResponseDTO[]> {
        const users = await this.userRepository.findAll();
        return plainToInstance(UserResponseDTO, users);
    }
}