import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('program')
export class Program {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 100 })
    name?: string;

    @Column({ length: 255, nullable: true })
    description?: string;

}