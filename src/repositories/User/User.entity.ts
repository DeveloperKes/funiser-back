import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { CommonEntity } from "../utils/Common.entity";
import { Token } from "../Token/Token.entity";
import { Person } from "../Person/Person.entity";

@Entity("users")
export class User extends CommonEntity {
    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @OneToMany(() => Token, token => token.user)
    tokens?: Token[];

    @OneToOne(() => Person, person => person.user)
    person?: Person;
}