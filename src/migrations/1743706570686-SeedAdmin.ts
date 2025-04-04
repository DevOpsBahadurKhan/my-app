import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedAdmin1743706570686 implements MigrationInterface {
    name = 'SeedAdmin1743706570686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`doctor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`doctorname\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`exp\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`doctor\``);
    }

}
