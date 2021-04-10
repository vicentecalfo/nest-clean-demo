import { Injectable } from '@nestjs/common';
import { User } from '../user';

@Injectable()
export class UserAdapter {
  public create(user): User {
    return new User({ ...user });
  }
}
