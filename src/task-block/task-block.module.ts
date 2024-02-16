import { Module } from '@nestjs/common';
import { TaskBlockService } from './task-block.service';
import { TaskBlockController } from './task-block.controller';

@Module({
  controllers: [TaskBlockController],
  providers: [TaskBlockService],
})
export class TaskBlockModule {}
