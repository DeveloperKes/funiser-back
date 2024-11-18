import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
export class CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}