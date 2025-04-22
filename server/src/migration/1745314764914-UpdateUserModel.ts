import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserModel1745314764914 implements MigrationInterface {
    name = 'UpdateUserModel1745314764914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "nickname" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "nickname" SET NOT NULL`);
    }

}
