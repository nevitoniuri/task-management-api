import { MigrationInterface, QueryRunner } from 'typeorm';

export class TasksTable1722360418651 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE tasks
        (
            id              INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            user_id         INTEGER      NOT NULL,
            title           VARCHAR(256) NOT NULL,
            description     VARCHAR(512),
            status          VARCHAR(20)  NOT NULL,
            expiration_date TIMESTAMPTZ  NOT NULL,
            created_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
            updated_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
            CONSTRAINT tasks_users_fk FOREIGN KEY (user_id) REFERENCES users (id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE tasks');
  }
}
