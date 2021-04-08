import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
const domainModules = [UserModule];
@Module({
  imports: [...domainModules],
  exports: [...domainModules],
})
export class DomainModule {}
