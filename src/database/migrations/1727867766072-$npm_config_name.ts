import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1727867766072 implements MigrationInterface {
  name = ' $npmConfigName1727867766072';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "userdetails" ("userdetail_id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "phonenumber" integer NOT NULL, "hiredate" TIMESTAMP NOT NULL, "terminationdate" TIMESTAMP NOT NULL, "password" character varying NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "deleted_on" TIMESTAMP, "user_id" integer, CONSTRAINT "REL_ac732df71a5d3724c9453f21d1" UNIQUE ("user_id"), CONSTRAINT "PK_51fee25871d91c6e7105f35b6e4" PRIMARY KEY ("userdetail_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "userroles" ("role_id" SERIAL NOT NULL, "name" "public"."userroles_name_enum" NOT NULL, "description" character varying NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "deleted_on" TIMESTAMP, CONSTRAINT "UQ_e79fbb7c075d05d57028d3c9fe3" UNIQUE ("name"), CONSTRAINT "PK_6a38f593a2bb2432379eecbefec" PRIMARY KEY ("role_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "departments" ("department_id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "deleted_on" TIMESTAMP, "usersUserId" integer, "patentdepartment_id" integer, CONSTRAINT "PK_202cd845b076ed15836884084eb" PRIMARY KEY ("department_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "deleted_on" TIMESTAMP, "userRoleRoleId" integer, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "userdetails" ADD CONSTRAINT "FK_ac732df71a5d3724c9453f21d14" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" ADD CONSTRAINT "FK_a8913babc637c38f59408900325" FOREIGN KEY ("usersUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" ADD CONSTRAINT "FK_896cf5fb8323fb8a212768f71f9" FOREIGN KEY ("patentdepartment_id") REFERENCES "departments"("department_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_11837df2fe79d70cda80fb82b52" FOREIGN KEY ("userRoleRoleId") REFERENCES "userroles"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_11837df2fe79d70cda80fb82b52"`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" DROP CONSTRAINT "FK_896cf5fb8323fb8a212768f71f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" DROP CONSTRAINT "FK_a8913babc637c38f59408900325"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userdetails" DROP CONSTRAINT "FK_ac732df71a5d3724c9453f21d14"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "departments"`);
    await queryRunner.query(`DROP TABLE "userroles"`);
    await queryRunner.query(`DROP TABLE "userdetails"`);
  }
}
