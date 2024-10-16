import { MigrationInterface, QueryRunner } from "typeorm";

export class Migracion1 implements MigrationInterface {
    name = 'Migracion1'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "children" ADD "desayuno" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "children" DROP COLUMN "desayuno"`);
    }

}
