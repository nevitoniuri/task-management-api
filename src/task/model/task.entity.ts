import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TaskStatus } from './task-status.enum';

@ObjectType('Task')
@Entity({ name: 'tasks' })
export class TaskEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  title: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 512, nullable: true })
  description: string;

  @Field(() => TaskStatus)
  @Column({ type: 'varchar', length: 20 })
  status: TaskStatus;

  @Field()
  @Column({ name: 'expiration_date', type: 'timestamptz' })
  expirationDate: Date;

  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
