import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
    imports: [PrismaModule, ProjectModule],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
