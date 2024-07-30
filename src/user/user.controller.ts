import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateRequest, UserResponse } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: UserCreateRequest): Promise<UserResponse> {
    const userEntity = await this.userService.createUser(user);
    return {
      id: userEntity.id,
      username: userEntity.username,
    };
  }
}
