import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { CommonEntity } from "../utils/Common.entity";
import { Person } from "../Person/Person.entity";
import { Session } from "../Session/Session.entity";

@Entity("profesionals")
export class Professional extends CommonEntity {
    @Column()
    contractNumber: string;

    //TODO: Definir especialidades en un enum o en una tabla
    @Column()
    specility: string;

    //TODO: Definir si es jornada o si hay una especificación mayor
    @Column()
    schedule: string;

    @OneToOne(() => Person)
    @JoinColumn({ name: 'id' })
    person: Person;

    @OneToMany(() => Session, session => session.professional)
    sessions: Session[];
}