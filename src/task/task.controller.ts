import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  FilterTaskRequest,
  CreateTaskRequest,
  UpdateTaskRequest,
} from './task.dto';
import { TaskService } from './task.service';
import { TaskHelper } from './task.helper';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() task: CreateTaskRequest) {
    return this.taskService.createTask(task);
  }

  @Get()
  async filterByUser(@Query() params: FilterTaskRequest) {
    return this.taskService.filterByUser(params).then((tasks) => {
      return tasks.map((task) => TaskHelper.toTaskResponse(task));
    });
  }

  @Put('/:id/complete')
  async completeTask(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.taskService.completeTask(id);
  }

  @Put('/:id')
  async updateTask(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTask: UpdateTaskRequest,
  ): Promise<void> {
    await this.taskService.updateTask(id, updateTask);
  }

  @Delete('/:id')
  async deleteTask(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.taskService.deleteTask(id);
  }
}
