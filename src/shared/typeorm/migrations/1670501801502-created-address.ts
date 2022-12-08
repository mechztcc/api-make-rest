import {MigrationInterface, QueryRunner} from "typeorm";

export class createdAddress1670501801502 implements MigrationInterface {
    name = 'createdAddress1670501801502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "zip" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "restaurantId" integer, CONSTRAINT "REL_df5c264824ae30173075717f06" UNIQUE ("restaurantId"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_df5c264824ae30173075717f06c" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_df5c264824ae30173075717f06c"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
