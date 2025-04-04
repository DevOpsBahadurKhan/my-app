import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDoctorTable1743706822290 implements MigrationInterface {
    name = 'CreateDoctorTable1743706822290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`doctor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`doctorname\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`exp\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`doctor\``);
    }

}
