import {Entity, Column, OneToMany, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Family } from './Family';
import { Child } from './Child';

@Entity('family_member')
export class Family_member {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    firstname?: string;

    @Column()
    lastname?: string;

    @Column({ length: 50 })
    relation?: string;

    @Column({ length: 50, nullable:true, unique: true })
    document?: string;

    @ManyToOne(() => Family, family => family.members)
    @JoinColumn({ name: 'family_id' })
    family?: Family;

    @OneToMany(() => Child, child => child.attendant)
    children?: Child[];

}
