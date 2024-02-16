import { User } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaskDto } from './dto/update.task.dto';
import { CreateTaskDto } from './dto/create.task.dto';

@Injectable()
export class TaskService {
   constructor(private readonly prismaService: PrismaService) {}

   async findAllTasks() {
      const allTasksInDB = await this.prismaService.task.findMany({});
      return allTasksInDB;
   }

   async findTaskById(id: string) {
      const findOneTask = await this.prismaService.task.findFirst({
         where: {
            id
         }
      })

      if(!findOneTask) {
         throw new NotFoundException("Task not found");
      }

      return findOneTask;
   }

   async createTask(taskDto: CreateTaskDto) {

   }

   async updateTask(taskDto: UpdateTaskDto) {}

   
}
