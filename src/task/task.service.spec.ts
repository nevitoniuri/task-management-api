import { Repository } from 'typeorm';
import { TaskEntity } from './model/task.entity';
import { TaskService } from './task.service';
import { UserService } from '../user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTaskRequest, TaskStatus } from './task.dto';
import { UserEntity } from '../user/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: Repository<TaskEntity>;
  let userService: UserService;

  beforeEach(async () => {
    const mockUserService = {
      findByIdOrThrow: jest.fn().mockResolvedValue({ id: '1' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
            createQueryBuilder: jest.fn(() => ({
              andWhere: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockResolvedValue([]),
            })),
          },
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<Repository<TaskEntity>>(
      getRepositoryToken(TaskEntity),
    );
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  describe('findByIdOrThrow', () => {
    it('should return a task', async () => {
      // Arrange
      const mockTask = new TaskEntity();
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(mockTask);

      // Act
      const result = await taskService.findByIdOrThrow('1');

      // Assert
      expect(result).toEqual(mockTask);
    });

    it('should throw an error if task is not found', async () => {
      // Arrange
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(undefined);

      // Act
      const result = taskService.findByIdOrThrow('1');

      // Assert
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      // Arrange
      const createTaskRequest: CreateTaskRequest = {
        userId: '1',
        title: 'Test task',
        description: 'Test description',
        expirationDate: new Date(),
      };

      // const userId = "123456";
      const mockUser = new UserEntity();
      mockUser.id = '1';
      const mockTaskEntity = {
        id: '1',
        user: mockUser,
        title: createTaskRequest.title,
        description: createTaskRequest.description,
        expirationDate: createTaskRequest.expirationDate,
        status: TaskStatus.TO_DO,
      };

      jest.spyOn(userService, 'findByIdOrThrow').mockResolvedValue(mockUser);
      jest
        .spyOn(taskRepository, 'save')
        .mockResolvedValue(mockTaskEntity as TaskEntity);

      // Act
      await taskService.createTask(createTaskRequest);

      // Assert
      expect(userService.findByIdOrThrow).toHaveBeenCalledWith(
        createTaskRequest.userId,
      );
      expect(taskRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          user: mockUser,
          title: createTaskRequest.title,
          description: createTaskRequest.description,
          expirationDate: createTaskRequest.expirationDate,
          status: TaskStatus.TO_DO,
        }),
      );
    });
  });

  describe('completeTask', () => {
    it('should complete a task', async () => {
      // Arrange
      const taskId = '1';
      const foundTask = new TaskEntity();
      foundTask.status = TaskStatus.TO_DO;
      jest.spyOn(taskService, 'findByIdOrThrow').mockResolvedValue(foundTask);

      // Act
      await taskService.completeTask(taskId);

      // Assert
      expect(taskService.findByIdOrThrow).toHaveBeenCalledWith(taskId);
      expect(foundTask.status).toEqual(TaskStatus.DONE);
      expect(taskRepository.save).toHaveBeenCalled();
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      // Arrange
      const taskId = '1';
      const updateTaskRequest = {
        title: 'Updated title',
        description: 'Updated description',
        expirationDate: new Date(),
      };
      const foundTask = new TaskEntity();
      jest.spyOn(taskService, 'findByIdOrThrow').mockResolvedValue(foundTask);

      // Act
      await taskService.updateTask(taskId, updateTaskRequest);

      // Assert
      expect(taskService.findByIdOrThrow).toHaveBeenCalledWith(taskId);
      expect(foundTask.title).toEqual(updateTaskRequest.title);
      expect(foundTask.description).toEqual(updateTaskRequest.description);
      expect(foundTask.expirationDate).toEqual(
        updateTaskRequest.expirationDate,
      );
      expect(taskRepository.save).toHaveBeenCalled();
    });
  });
});
