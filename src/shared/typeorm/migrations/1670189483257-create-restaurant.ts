import {MigrationInterface, QueryRunner} from "typeorm";

export class createRestaurant1670189483257 implements MigrationInterface {
    name = 'createRestaurant1670189483257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "restaurants" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "details" character varying NOT NULL, "opened" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_e2133a72eb1cc8f588f7b503e68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "restaurants" ADD CONSTRAINT "FK_a6d82a35be7467761ee3a1a309e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurants" DROP CONSTRAINT "FK_a6d82a35be7467761ee3a1a309e"`);
        await queryRunner.query(`DROP TABLE "restaurants"`);
    }

}
