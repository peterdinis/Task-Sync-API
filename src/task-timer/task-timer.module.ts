import { Module } from '@nestjs/common';
import { TaskTimerService } from './task-timer.service';
import { TaskTimerController } from './task-timer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [TaskTimerController],
    providers: [TaskTimerService],
})
export class TaskTimerModule {}
