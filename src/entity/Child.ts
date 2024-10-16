import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, BaseEntity, ManyToOne, PrimaryColumn, OneToMany} from 'typeorm';
import{ Eps } from './Eps';
import { Session } from './Sessions';
import { Family } from './Family';
import { Family_member } from './Family_member';

@Entity("children")
export class Child {
    @PrimaryColumn()
    id?: string;

    @Column({ length: 50, nullable: false })
    firstname?: string;

    @Column({ length: 50, nullable: false })
    lastname?: string;

    @Column({ length: 50, nullable: false })
    gender?: string;

    @Column({nullable: false})
    birthday?: Date;

    @Column({ length: 50, nullable: false })
    status?: string;

    @Column({ length: 50, nullable: false })
    desayuno?: string;

    @ManyToOne(() => Eps, eps => eps.children)
    eps?: Eps;

    @OneToMany(() => Session, session => session.child)
    sessions?: Session[];

    @OneToMany(() => Family_member, family_member => family_member.children)
    @JoinColumn({name: 'children_id'})
    attendant?: Family_member;

    @ManyToOne(() => Family, family => family.children)
    @JoinColumn({ name: 'family_id' })
    family?: Family;
}
