import { BaseEntity, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
export class CommonEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}