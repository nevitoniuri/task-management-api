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
import { TaskService } from './task.service';
import { TaskHelper } from './task.helper';
import { TaskCreateRequest } from './dto/task-create.dto';
import { TaskFilterRequest } from './dto/task-filter.dto';
import { TaskUpdateRequest } from './dto/task-update.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() task: TaskCreateRequest) {
    return this.taskService.createTask(task);
  }

  @Get()
  async filterByUser(@Query() params: TaskFilterRequest) {
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
    @Body() updateTask: TaskUpdateRequest,
  ): Promise<void> {
    await this.taskService.updateTask(id, updateTask);
  }

  @Delete('/:id')
  async deleteTask(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.taskService.deleteTask(id);
  }
}
