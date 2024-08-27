import { TaskStatus } from '../model/task-status.enum';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskResponse {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => TaskStatus)
  status: TaskStatus;

  @Field()
  expirationDate: Date;

  @Field()
  expired: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
