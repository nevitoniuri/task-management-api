import { Injectable, NotFoundException } from '@nestjs/common';
import {
  FilterTaskRequest,
  TaskCreateRequest,
  TaskStatus,
  TaskUpdateRequest,
} from './task.dto';
import { v4 as uuid } from 'uuid';
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

  async findById(id: string): Promise<TaskEntity> {
    return this.taskRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByIdOrThrow(id: string): Promise<TaskEntity> {
    const task = await this.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async createTask(task: TaskCreateRequest) {
    const userEntity = await this.userService.findByIdOrThrow(task.userId);
    const newTask = new TaskEntity();
    newTask.id = uuid();
    newTask.user = userEntity;
    newTask.title = task.title;
    newTask.description = task.description;
    newTask.expirationDate = task.expirationDate;
    newTask.status = TaskStatus.TO_DO;
    await this.taskRepository.save(newTask);
  }

  async completeTask(id: string) {
    const task = await this.findByIdOrThrow(id);
    task.status = TaskStatus.DONE;
    await this.taskRepository.save(task);
  }

  async updateTask(id: string, updateTask: TaskUpdateRequest) {
    const task = await this.findByIdOrThrow(id);
    task.title = updateTask.title ?? task.title;
    task.description = updateTask.description ?? task.description;
    task.expirationDate = updateTask.expirationDate ?? task.expirationDate;
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    const deleteResult = await this.taskRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async findAll(params: FilterTaskRequest): Promise<TaskEntity[]> {
    const query = this.taskRepository.createQueryBuilder('task');
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
    return await query.getMany();
  }
}
