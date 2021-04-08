import { DomainModule } from '@domain/domain.module';
import { Module } from '@nestjs/common';
import { userControllers } from './user/user-controllers';

@Module({
  controllers: [...userControllers],
  imports: [DomainModule],
  providers: [],
})
export class ControllersModule {}
