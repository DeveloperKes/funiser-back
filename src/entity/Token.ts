import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Person } from './Person';
import { User } from './User';

@Entity("tokens")
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 255, unique: true })
  token?: string;

  @Column({ length: 255, unique: true })
  hashedtoken?: string;

  @OneToOne(() => User, user => user.token)
  @JoinColumn({ name: 'user_id' }) 
  user?: User;
}
