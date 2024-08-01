import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskStatus } from './task.dto';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'varchar', length: 256 })
  title: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 20 })
  status: TaskStatus;

  @Column({ name: 'expiration_date', type: 'timestamptz' })
  expirationDate: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
