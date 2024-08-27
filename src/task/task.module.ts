import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './model/task.entity';
import { UserModule } from '../user/user.module';
import { TaskResolver } from './task.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), UserModule],
  controllers: [TaskController],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
