import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialSchema1753233642066 implements MigrationInterface {
  name = 'CreateInitialSchema1753233642066';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cultures" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_1d1e898d879d22c4a3c25e4d9e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "harvests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, CONSTRAINT "PK_fb748ae28bc0000875b1949a0a6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "farm_culture_harvests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "farmId" uuid, "harvestId" uuid, "cultureId" uuid, CONSTRAINT "PK_cb6cce15e965c21e8c1d1d414ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "farms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "totalArea" numeric NOT NULL, "agriculturalArea" numeric NOT NULL, "vegetationArea" numeric NOT NULL, "producerId" uuid, CONSTRAINT "PK_39aff9c35006b14025bba5a43d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "producers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "document" character varying NOT NULL, CONSTRAINT "UQ_55554aac38152436aa25b1e3530" UNIQUE ("document"), CONSTRAINT "PK_7f16886d1a44ed0974232b82506" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "farm_culture_harvests" ADD CONSTRAINT "FK_02e9490afc4d25195269dd4b145" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "farm_culture_harvests" ADD CONSTRAINT "FK_f50af36dfecdd353279ffa7e33c" FOREIGN KEY ("harvestId") REFERENCES "harvests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "farm_culture_harvests" ADD CONSTRAINT "FK_20191458a5fe528d8e8ac0b9ebf" FOREIGN KEY ("cultureId") REFERENCES "cultures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "farms" ADD CONSTRAINT "FK_a47fa1b0ccf320f4028705ca3dd" FOREIGN KEY ("producerId") REFERENCES "producers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "farms" DROP CONSTRAINT "FK_a47fa1b0ccf320f4028705ca3dd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "farm_culture_harvests" DROP CONSTRAINT "FK_20191458a5fe528d8e8ac0b9ebf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "farm_culture_harvests" DROP CONSTRAINT "FK_f50af36dfecdd353279ffa7e33c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "farm_culture_harvests" DROP CONSTRAINT "FK_02e9490afc4d25195269dd4b145"`,
    );
    await queryRunner.query(`DROP TABLE "producers"`);
    await queryRunner.query(`DROP TABLE "farms"`);
    await queryRunner.query(`DROP TABLE "farm_culture_harvests"`);
    await queryRunner.query(`DROP TABLE "harvests"`);
    await queryRunner.query(`DROP TABLE "cultures"`);
  }
}
