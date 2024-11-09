import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryColumn } from "typeorm";
import { CommonEntity } from "../utils/Common.entity";
import { User } from "../User/User.entity";
import { Role } from "../Role/Role.entity";
import { Professional } from "../Professional/Professional.entity";
import { Member } from "../Family/Member/Member.entity";

@Entity("persons")
export class Person extends CommonEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    secondaryPhone?: string

    @OneToOne(() => User, { cascade: true })
    @JoinColumn()
    user: User;

    @ManyToMany(() => Role, role => role.persons, { cascade: false, onDelete: 'NO ACTION' })
    roles: Role[];

    @OneToOne(() => Professional, profesional => profesional.person, { cascade: true })
    professional: Professional;

    @OneToOne(() => Member, member => member.person, { cascade: true })
    member: Member;
}