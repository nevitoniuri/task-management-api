import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserCreateRequest } from './user.dto';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByIdOrThrow(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async createUser(user: UserCreateRequest) {
    const existingUser = await this.findByUsername(user.username);
    if (existingUser) {
      throw new ConflictException('User with this username already exists');
    }
    const newUser = new UserEntity();
    newUser.id = randomUUID();
    newUser.username = user.username;
    newUser.password = user.password;
    return await this.userRepository.save(newUser);
  }
}
