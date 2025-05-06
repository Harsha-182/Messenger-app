import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultDate1746527135553 implements MigrationInterface {
    name = 'AddDefaultDate1746527135553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "created_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "created_at" DROP DEFAULT`);
    }

}
