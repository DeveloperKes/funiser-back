import { Entity, PrimaryColumn, Column, BaseEntity, JoinTable, ManyToMany } from 'typeorm';
import { Person } from './Person'

@Entity("role")
export class Role extends BaseEntity {
    @PrimaryColumn()
    id_role?: string;

    @Column()
    role?: string;

    @ManyToMany(() => Person, person => person.roles)
    @JoinTable({
        name: 'role_roles_persons', 
        joinColumn: { name: 'roleIdRole', referencedColumnName: 'id_role' },
        inverseJoinColumn: { name: 'personsIdPerson', referencedColumnName: 'id_person' }
    })
    persons?: Person[];

}


