import { TaskEntity } from './model/task.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { TaskResponse } from './dto/task-response.dto';
import { TaskCreateRequest } from './dto/task-create.dto';
import { TaskUpdateRequest } from './dto/task-update.dto';
import { TaskFilterRequest } from './dto/task-filter.dto';

@Resolver(() => TaskEntity)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [TaskResponse], { name: 'tasks' })
  getTasks(@Args('taskFilter') taskFilter: TaskFilterRequest) {
    return this.taskService.filterByUser(taskFilter);
  }

  @Mutation(() => TaskEntity)
  createTask(@Args('taskCreate') taskCreate: TaskCreateRequest) {
    return this.taskService.createTask(taskCreate);
  }

  @Mutation(() => Boolean)
  completeTask(@Args('id', { type: () => String }) id: string) {
    return this.taskService.completeTask(id);
  }

  @Mutation(() => Boolean)
  updateTask(
    @Args('id', { type: () => String }) id: string,
    @Args('taskUpdate') taskUpdate: TaskUpdateRequest,
  ) {
    return this.taskService.updateTask(id, taskUpdate);
  }

  @Mutation(() => Boolean)
  deleteTask(@Args('id', { type: () => String }) id: string) {
    return this.taskService.deleteTask(id);
  }
}
