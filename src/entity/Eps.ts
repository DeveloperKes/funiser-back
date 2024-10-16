import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, BaseEntity, OneToMany } from 'typeorm';
import { Child } from './Child';

@Entity("eps")
export class Eps {
    @PrimaryGeneratedColumn()
    id_eps?: number;

    @Column({ length: 50, nullable: false })
    name?: string;

    @OneToMany(() => Child, child => child.eps)
    children?: Child[];
}
