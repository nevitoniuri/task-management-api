import { MigrationInterface, QueryRunner } from 'typeorm';

export class TasksTable1722360418651 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryRunner.query(`
        CREATE TABLE tasks
        (
            id              uuid         NOT NULL DEFAULT uuid_generate_v4(),
            user_id         uuid         NOT NULL,
            title           varchar(256) NOT NULL,
            description     varchar(512),
            status          varchar(20)  NOT NULL,
            expiration_date timestamptz  NOT NULL,
            CONSTRAINT task_pk PRIMARY KEY (id),
            CONSTRAINT task_user_fk FOREIGN KEY (user_id) REFERENCES users (id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE tasks');
  }
}
