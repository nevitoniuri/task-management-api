import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersTable1722354500282 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryRunner.query(`
        CREATE TABLE users
        (
            id         uuid         NOT NULL DEFAULT uuid_generate_v4(),
            username   varchar(256) NOT NULL,
            password   varchar(256) NOT NULL,
            created_at timestamptz  NOT NULL DEFAULT now(),
            updated_at timestamptz  NOT NULL DEFAULT now(),
            CONSTRAINT users_pk PRIMARY KEY (id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS users');
  }
}
