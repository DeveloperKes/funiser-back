import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { CommonEntity } from "../utils/Common.entity";
import { Member } from "../Family/Member/Member.entity";
import { Family } from "../Family/Family.entity";
import { Eps } from "../Eps/Eps.entity";

export enum GenderEnum {
    M = "male",
    F = "female",
    NS = "no_set"
}

@Entity("children")
export class Child extends CommonEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ type: 'enum', enumName: 'gender', enum: GenderEnum, default: GenderEnum.NS })
    gender: GenderEnum;

    @Column({ type: 'date' })
    birthday: Date;

    // TODO: Definir los status en un enum
    @Column()
    status: string;

    @ManyToOne(() => Member, member => member.children)
    attendant: Member;

    @ManyToOne(() => Family, family => family.children)
    family: Family;

    @ManyToOne(() => Eps, eps => eps.children)
    eps: Eps;
}