import { Column, Entity, OneToMany } from "typeorm";
import { CommonEntity } from "../utils/Common.entity";
import { Member } from "./Member/Member.entity";
import { Child } from "../Child/Child.entity";

@Entity("families")
export class Family extends CommonEntity {
    // TODO: Definir los tipos de familia en un enum
    @Column({ default: 1 })
    family_type: number;

    @OneToMany(() => Member, member => member.family)
    members: Member[];

    @OneToMany(() => Child, child => child.family)
    children: Child[];
}