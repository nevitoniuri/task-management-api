import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TaskStatus } from '../model/task-status.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskFilterRequest {
  @IsUUID()
  @IsNotEmpty()
  @Field()
  readonly userId: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  readonly title?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  @Field(() => TaskStatus, { nullable: true })
  readonly status?: TaskStatus;

  @IsOptional()
  @IsDateString()
  @Field({ nullable: true })
  readonly expirationDate?: Date;
}
