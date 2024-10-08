import { Entity, Column, JoinColumn, BaseEntity, OneToMany, PrimaryColumn, OneToOne } from 'typeorm';
import { Person } from './Person';
import { Session } from './Sessions';


@Entity("professional")
export class Professional {
    @PrimaryColumn()
    professional_id?: string;

    @Column({ length: 50 })
    contract_number?: string;

    @Column({ length: 50 })
    specialty?: string;

    @Column({ length: 50 })
    horary?: string;

    @OneToOne(() => Person)
    @JoinColumn({ name: 'professional_id' })
    person?: Person;

    @OneToMany(() => Session, session => session.professional)
    sessions?: Session[];
}
