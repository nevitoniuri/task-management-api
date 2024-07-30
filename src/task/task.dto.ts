import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class TaskResponse {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  expirationDate: Date;
}

export class TaskCreateRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @MinLength(5)
  @MaxLength(512)
  @IsOptional()
  description: string;

  @IsDateString()
  expirationDate: Date;

  @IsUUID()
  userId: string;
}

export class TaskUpdateRequest {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(512)
  description: string;

  @IsOptional()
  @IsDateString()
  expirationDate: Date;
}

export class FilterTaskRequest {
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
