import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Child } from "./Child";
import { Family_member } from "./Family_member";

@Entity("family") 
export class Family{
    @PrimaryGeneratedColumn({})
    id?:number;

    @Column({})
    family_type?: number = 1;

@OneToMany(() => Family_member, family_member => family_member.family, {
    cascade: true,
})
members?: Family_member[];

    @OneToMany(() => Child, child => child.family)
    children?: Child[];
}