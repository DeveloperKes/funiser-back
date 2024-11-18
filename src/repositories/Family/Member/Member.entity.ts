import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from '../../Person/Person.entity'
import { Child } from '../../Child/Child.entity'
import { Family } from "../Family.entity";
import { CommonEntity } from "../../utils/Common.entity";

export enum RelationEnum {
    FATHER = "father",
    MOTHER = "mother",
    SISTER = "sister",
    BROTHER = "brother",
    GRANDF = "grand_father",
    GRANDM = "grand_mother",
    UNCLE = "uncle",
    AUNT = "aunt",
    GUARDIAN = "guardian",
    UNRELATED = "unrelated"
}

@Entity("family_members")
export class Member extends CommonEntity {

    @Column({ type: 'enum', enum: RelationEnum, enumName: 'relation', default: RelationEnum.UNRELATED })
    relation: RelationEnum;

    @ManyToOne(() => Family, family => family.members)
    family: Family

    @OneToOne(() => Person)
    @JoinColumn({ name: 'id' })
    person: Person;

    @OneToMany(() => Child, child => child.attendant)
    children: Child[];
}