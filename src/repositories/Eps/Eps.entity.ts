import { Column, Entity, OneToMany } from "typeorm";
import { CommonEntity } from "../utils/Common.entity";
import { Child } from "../Child/Child.entity";


@Entity('eps')
export class Eps extends CommonEntity {
    @Column()
    name: string;

    @OneToMany(() => Child, child => child.eps)
    children: Child[]
}