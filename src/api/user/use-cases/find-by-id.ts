import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../user.entity';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    return typeof user === 'undefined' ? undefined : new User({ ...user });
  }
}