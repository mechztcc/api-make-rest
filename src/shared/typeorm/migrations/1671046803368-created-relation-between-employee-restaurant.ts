import {MigrationInterface, QueryRunner} from "typeorm";

export class createdRelationBetweenEmployeeRestaurant1671046803368 implements MigrationInterface {
    name = 'createdRelationBetweenEmployeeRestaurant1671046803368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."employees_type_enum" AS ENUM('waiter', 'cashier', 'cooker')`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "document" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "type" "public"."employees_type_enum" NOT NULL DEFAULT 'waiter', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "restaurantId" integer, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_f7bbcbeb00afd1003ca61128542" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_f7bbcbeb00afd1003ca61128542"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TYPE "public"."employees_type_enum"`);
    }

}
