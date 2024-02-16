import { Module } from '@nestjs/common';
import { TaskBlockService } from './task-block.service';
import { TaskBlockController } from './task-block.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [TaskBlockController],
    providers: [TaskBlockService],
})
export class TaskBlockModule {}
