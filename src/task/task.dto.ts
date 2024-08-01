import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class TaskResponse {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  expirationDate: Date;
}

export class CreateTaskRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @MinLength(5)
  @MaxLength(512)
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  expirationDate: Date;

  @IsNotEmpty()
  userId: number;
}

export class UpdateTaskRequest {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(512)
  description?: string;

  @IsOptional()
  @IsDateString()
  expirationDate?: Date;
}

export class FilterTaskRequest {
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsDateString()
  expirationDate?: Date;
}
