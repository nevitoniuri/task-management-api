import { Injectable, NotFoundException } from '@nestjs/common';
import {
  FilterTaskRequest,
  CreateTaskRequest,
  TaskStatus,
  UpdateTaskRequest,
} from './task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly userService: UserService,
  ) {}

  private async findByIdOrThrow(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async createTask(task: CreateTaskRequest) {
    const userEntity = await this.userService.findByIdOrThrow(task.userId);
    const newTask = new TaskEntity();
    newTask.user = userEntity;
    newTask.title = task.title;
    newTask.description = task.description;
    newTask.expirationDate = task.expirationDate;
    newTask.status = TaskStatus.TO_DO;
    await this.taskRepository.save(newTask);
  }

  async completeTask(id: number) {
    const task = await this.findByIdOrThrow(id);
    task.status = TaskStatus.DONE;
    await this.taskRepository.save(task);
  }

  async updateTask(id: number, updateTask: UpdateTaskRequest) {
    const task = await this.findByIdOrThrow(id);
    task.title = updateTask.title ?? task.title;
    task.description = updateTask.description ?? task.description;
    task.expirationDate = updateTask.expirationDate ?? task.expirationDate;
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.findByIdOrThrow(id);
    await this.taskRepository.delete(task.id);
  }

  async filterByUser(params: FilterTaskRequest): Promise<TaskEntity[]> {
    const query = this.taskRepository.createQueryBuilder('task');
    query.andWhere('task.user.id = :userId', { userId: params.userId });
    if (params.title) {
      query.andWhere('task.title LIKE :title', { title: `%${params.title}%` });
    }
    if (params.status) {
      query.andWhere('task.status = :status', { status: params.status });
    }
    if (params.expirationDate) {
      query.andWhere('task.expirationDate > :expirationDate', {
        expirationDate: params.expirationDate,
      });
    }
    return query.getMany();
  }
}
