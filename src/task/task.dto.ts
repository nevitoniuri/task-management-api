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
  expired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateTaskRequest {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @MinLength(5)
  @MaxLength(512)
  @IsOptional()
  readonly description?: string;

  @IsDateString()
  readonly expirationDate: Date;

  @IsUUID()
  @IsNotEmpty()
  readonly userId: string;
}

export class UpdateTaskRequest {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(512)
  readonly description?: string;

  @IsOptional()
  @IsDateString()
  readonly expirationDate?: Date;
}

export class FilterTaskRequest {
  @IsUUID()
  @IsNotEmpty()
  readonly userId: string;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status?: TaskStatus;

  @IsOptional()
  @IsDateString()
  readonly expirationDate?: Date;
}
