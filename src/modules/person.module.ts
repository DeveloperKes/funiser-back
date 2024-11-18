import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person, PersonRepository } from "src/repositories";

@Module({
    controllers: [],
    exports: [PersonRepository],
    imports: [TypeOrmModule.forFeature([Person])],
    providers: [PersonRepository]
})
export class PersonModule { }