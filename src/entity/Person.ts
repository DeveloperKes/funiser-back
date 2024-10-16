import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, PrimaryColumn, BaseEntity, DeleteDateColumn } from 'typeorm';
import { User } from './User';
import { Role } from './Role';
import { Professional } from './Professional';

@Entity("persons")
export class Person extends BaseEntity {
  @PrimaryColumn()
  id_person?: string;

  @Column({ length: 50, nullable: false })
  firstname?: string;

  @Column({ length: 50, nullable: false })
  lastname?: string;

  @Column({ length: 20, nullable: false })
  phonenumber?: string;

  @Column({ length: 20, nullable: true })
  secondaryphone?: string;

  @DeleteDateColumn({})
  deletedAt?: Date;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user?: User;

  @ManyToMany(() => Role, role => role.persons, { cascade: true, onDelete: 'CASCADE' })
  roles?: Role[];

  @OneToOne(() => Professional, professional => professional.person)
  professional?: Professional;
}
