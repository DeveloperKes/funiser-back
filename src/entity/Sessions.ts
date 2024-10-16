import { Column, PrimaryColumn, JoinColumn, Entity, ManyToOne } from "typeorm";
import { Professional } from "./Professional";
import { Child } from "./Child";

@Entity("sessions")
export class Session {
    @PrimaryColumn({length: 50})
    professional_id?: string;

    @Column({length: 50})
    child_id?: string;

    @Column()
    attention_date?: Date;

    @ManyToOne(() => Professional)
    @JoinColumn({ name: 'professional_id' })
    professional?: Professional;

    @ManyToOne(() => Child)
    @JoinColumn({ name: 'child_id' })
    child?: Child;

}