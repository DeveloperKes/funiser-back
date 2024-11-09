import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { CommonEntity } from "../utils/Common.entity";
import { Person } from "../Person/Person.entity";

@Entity("role")
export class Role extends CommonEntity {
    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Person, person => person.roles)
    @JoinTable({
        name: 'role_roles_persons',
        joinColumn: { name: 'roleIdRole', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'personsIdPerson', referencedColumnName: 'id' }
    })
    persons: Person[]
}