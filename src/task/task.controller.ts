import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  FilterTaskRequest,
  TaskCreateRequest,
  TaskResponse,
  TaskUpdateRequest,
} from './task.dto';
import { TaskService } from './task.service';
import { TaskEntity } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() task: TaskCreateRequest) {
    return this.taskService.createTask(task);
  }

  @Get()
  async findAll(@Query() params: FilterTaskRequest): Promise<TaskResponse[]> {
    return this.taskService.findAll(params).then((tasks) => {
      return tasks.map((task) => {
        return {
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status,
          expirationDate: task.expirationDate,
        };
      });
    });
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<TaskEntity> {
    return this.taskService.findByIdOrThrow(id);
  }

  @Put('/:id/complete')
  async completeTask(@Param('id') id: string) {
    await this.taskService.completeTask(id);
  }

  @Put('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTask: TaskUpdateRequest,
  ): Promise<TaskResponse> {
    return await this.taskService.updateTask(id, updateTask);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string) {
    await this.taskService.deleteTask(id);
  }
}
