import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserModel1745309405536 implements MigrationInterface {
    name = 'UpdateUserModel1745309405536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "nickname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "sub" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "picture" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sub"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nickname"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`);
    }

}
