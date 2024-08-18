import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByName(username: string): Promise<UserEntity> {
    return await this.userRepository.getUserByName(username);
  }
}
