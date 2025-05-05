import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtToMessage1746190002810 implements MigrationInterface {
    name = 'AddCreatedAtToMessage1746190002810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "created_at"`);
    }

}
