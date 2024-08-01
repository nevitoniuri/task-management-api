import { TaskEntity } from './task.entity';
import { TaskResponse } from './task.dto';

export class TaskHelper {
  static toTaskResponse(taskEntity: TaskEntity) {
    const taskResponse = new TaskResponse();
    taskResponse.id = taskEntity.id;
    taskResponse.title = taskEntity.title;
    taskResponse.description = taskEntity.description;
    taskResponse.status = taskEntity.status;
    taskResponse.expirationDate = taskEntity.expirationDate;
    taskResponse.createdAt = taskEntity.createdAt;
    taskResponse.updatedAt = taskEntity.updatedAt;
    taskResponse.expired = taskEntity.expirationDate < new Date();
    return taskResponse;
  }
}
