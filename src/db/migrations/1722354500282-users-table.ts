import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersTable1722354500282 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE users
        (
            id       INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            username VARCHAR(256) NOT NULL,
            password VARCHAR(256) NOT NULL
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS users');
  }
}
