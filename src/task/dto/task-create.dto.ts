import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskCreateRequest {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @Field({ nullable: true })
  @MinLength(5)
  @MaxLength(512)
  @IsOptional()
  readonly description?: string;

  @Field()
  @IsDateString()
  readonly expirationDate: Date;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  readonly userId: string;
}
