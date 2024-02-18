import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProjectModule } from 'src/project/project.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [PrismaModule, ProjectModule, UsersModule],
    controllers: [TaskController],
    providers: [TaskService],
    exports: [TaskService]
})
export class TaskModule {}
