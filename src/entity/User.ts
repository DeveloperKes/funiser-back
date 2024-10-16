import { Entity, PrimaryColumn, Column, BaseEntity, OneToOne, JoinColumn, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';
import { Person } from './Person';
import { Token } from './Token';

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 55, unique: true })
  username?: string;

  @Column({ length: 100, unique: true })
  email?: string;

  @Column({ length: 150, nullable: false })
  password?: string;
  
  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToOne(() => Person, person => person.user)
  person?: Person;

  @OneToOne(() => Token, token => token.user)
  token?: Token;
}
