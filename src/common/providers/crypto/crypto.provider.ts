import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class CryptoProvider {
  public async generateSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }

  public async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public async generateToken(bytes = 32): Promise<string> {
    return await crypto.randomBytes(bytes).toString('hex');
  }
}
