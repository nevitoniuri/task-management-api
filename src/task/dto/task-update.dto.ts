import {
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskUpdateRequest {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  readonly title?: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(512)
  @Field({ nullable: true })
  readonly description?: string;

  @IsOptional()
  @IsDateString()
  @Field({ nullable: true })
  readonly expirationDate?: Date;
}
