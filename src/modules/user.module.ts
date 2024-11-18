import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User, UserRepository } from "src/repositories";
import { UserService } from "src/services";

@Module({
    controllers: [],
    providers: [UserService, UserRepository],
    exports: [UserRepository, UserService],
    imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule { }