import { Column, Entity, ManyToOne } from "typeorm";
import { CommonEntity } from "../utils/Common.entity";
import { Professional } from "../Professional/Professional.entity";

@Entity("sessions")
export class Session extends CommonEntity {
    @Column()
    attentionDate: Date;

    @Column({ nullable: true })
    comments?: string;

    @ManyToOne(() => Professional, professional => professional.sessions)
    professional: Professional;
}