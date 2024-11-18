import { MigrationInterface, QueryRunner } from "typeorm";

export class BuildDatabase1731889353851 implements MigrationInterface {
    name = 'BuildDatabase1731889353851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."status" AS ENUM('active', 'inactive', 'revoked', 'suspect')`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" character varying NOT NULL, "status" "public"."status" NOT NULL DEFAULT 'active', "device" character varying NOT NULL, "lastConnection" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "attentionDate" TIMESTAMP NOT NULL, "comments" character varying, "professionalId" uuid, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profesionals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "contractNumber" character varying NOT NULL, "specility" character varying NOT NULL, "schedule" character varying NOT NULL, CONSTRAINT "PK_eefdc024293ccb8fa236deaa9c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "persons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "phone" character varying NOT NULL, "secondaryPhone" character varying, "userId" uuid, CONSTRAINT "REL_e180e344d1f7b97f74b8137ace" UNIQUE ("userId"), CONSTRAINT "PK_74278d8812a049233ce41440ac7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "families" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "family_type" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_70414ac0c8f45664cf71324b9bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."relation" AS ENUM('father', 'mother', 'sister', 'brother', 'grand_father', 'grand_mother', 'uncle', 'aunt', 'guardian', 'unrelated')`);
        await queryRunner.query(`CREATE TABLE "family_members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "relation" "public"."relation" NOT NULL DEFAULT 'unrelated', "familyId" uuid, CONSTRAINT "PK_186da7c7fcbf23775fdd888a747" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "eps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_5da8e3a0bc18f9b646d8b5e1a74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'no_set')`);
        await queryRunner.query(`CREATE TABLE "children" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "firstname" character varying NOT NULL, "lasstname" character varying NOT NULL, "gender" "public"."gender" NOT NULL DEFAULT 'no_set', "birthday" date NOT NULL, "status" character varying NOT NULL, "attendantId" uuid, "familyId" uuid, "epsId" uuid, CONSTRAINT "PK_8c5a7cbebf2c702830ef38d22b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_roles_persons" ("roleIdRole" uuid NOT NULL, "personsIdPerson" uuid NOT NULL, CONSTRAINT "PK_75243c1978086edeed0806e9f2e" PRIMARY KEY ("roleIdRole", "personsIdPerson"))`);
        await queryRunner.query(`CREATE INDEX "IDX_41059da023c71ca3e46bbc265f" ON "role_roles_persons" ("roleIdRole") `);
        await queryRunner.query(`CREATE INDEX "IDX_1259e202351fcdd6fbae0edbdd" ON "role_roles_persons" ("personsIdPerson") `);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_170dfe8b1b724cb6d9a180532d6" FOREIGN KEY ("professionalId") REFERENCES "profesionals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profesionals" ADD CONSTRAINT "FK_eefdc024293ccb8fa236deaa9c7" FOREIGN KEY ("id") REFERENCES "persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "persons" ADD CONSTRAINT "FK_e180e344d1f7b97f74b8137aced" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "family_members" ADD CONSTRAINT "FK_8e1c2c602b66f79d1ac89f24d97" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "family_members" ADD CONSTRAINT "FK_186da7c7fcbf23775fdd888a747" FOREIGN KEY ("id") REFERENCES "persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "children" ADD CONSTRAINT "FK_024fac960cad5364afe7b6eb2a5" FOREIGN KEY ("attendantId") REFERENCES "family_members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "children" ADD CONSTRAINT "FK_60470a6ffee687392d8c64c31a9" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "children" ADD CONSTRAINT "FK_8622cff35554e3c28b9acc6c8e0" FOREIGN KEY ("epsId") REFERENCES "eps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_roles_persons" ADD CONSTRAINT "FK_41059da023c71ca3e46bbc265f0" FOREIGN KEY ("roleIdRole") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_roles_persons" ADD CONSTRAINT "FK_1259e202351fcdd6fbae0edbddf" FOREIGN KEY ("personsIdPerson") REFERENCES "persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_roles_persons" DROP CONSTRAINT "FK_1259e202351fcdd6fbae0edbddf"`);
        await queryRunner.query(`ALTER TABLE "role_roles_persons" DROP CONSTRAINT "FK_41059da023c71ca3e46bbc265f0"`);
        await queryRunner.query(`ALTER TABLE "children" DROP CONSTRAINT "FK_8622cff35554e3c28b9acc6c8e0"`);
        await queryRunner.query(`ALTER TABLE "children" DROP CONSTRAINT "FK_60470a6ffee687392d8c64c31a9"`);
        await queryRunner.query(`ALTER TABLE "children" DROP CONSTRAINT "FK_024fac960cad5364afe7b6eb2a5"`);
        await queryRunner.query(`ALTER TABLE "family_members" DROP CONSTRAINT "FK_186da7c7fcbf23775fdd888a747"`);
        await queryRunner.query(`ALTER TABLE "family_members" DROP CONSTRAINT "FK_8e1c2c602b66f79d1ac89f24d97"`);
        await queryRunner.query(`ALTER TABLE "persons" DROP CONSTRAINT "FK_e180e344d1f7b97f74b8137aced"`);
        await queryRunner.query(`ALTER TABLE "profesionals" DROP CONSTRAINT "FK_eefdc024293ccb8fa236deaa9c7"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_170dfe8b1b724cb6d9a180532d6"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1259e202351fcdd6fbae0edbdd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41059da023c71ca3e46bbc265f"`);
        await queryRunner.query(`DROP TABLE "role_roles_persons"`);
        await queryRunner.query(`DROP TABLE "children"`);
        await queryRunner.query(`DROP TYPE "public"."gender"`);
        await queryRunner.query(`DROP TABLE "eps"`);
        await queryRunner.query(`DROP TABLE "family_members"`);
        await queryRunner.query(`DROP TYPE "public"."relation"`);
        await queryRunner.query(`DROP TABLE "families"`);
        await queryRunner.query(`DROP TABLE "persons"`);
        await queryRunner.query(`DROP TABLE "profesionals"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TYPE "public"."status"`);
    }

}
