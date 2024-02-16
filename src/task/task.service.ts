import { User } from '@prisma/client';
import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaskDto } from './dto/update.task.dto';

@Injectable()
export class TaskService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllUserTasks(userId: string) {
        const findAllTasksForUser = await this.prismaService.task.findMany({
            where: {
                userId,
            },
        });

        if (!findAllTasksForUser) {
            throw new ConflictException('User is not logged or not exists');
        }

        return findAllTasksForUser;
    }

    async findAllTasks() {
        const allTasksInDB = await this.prismaService.task.findMany({});
        return allTasksInDB;
    }

    async findTaskById(id: string) {
        const findOneTask = await this.prismaService.task.findFirst({
            where: {
                id,
            },
        });

        if (!findOneTask) {
            throw new NotFoundException('Task not found');
        }

        return findOneTask;
    }

    // TODO: Neskôr nahradiť za CreateTaskDto
    async createTask(taskDto: any) {
        const newTask = await this.prismaService.task.create({
            data: {
                ...taskDto,
            },
        });

        if (!newTask) {
            throw new BadRequestException('Task can not be created');
        }

        return newTask;
    }

    async updateTask(taskDto: UpdateTaskDto, id: string) {
        const findOneTask = await this.findTaskById(id);

        const updateSpecificTask = await this.prismaService.task.update({
            where: {
                id: findOneTask.id,
            },

            data: {
                ...taskDto,
            },
        });

        if (!updateSpecificTask) {
            throw new ForbiddenException('Problem with updating task');
        }

        return updateSpecificTask;
    }

    async deleteTask(id: string) {
        const findOneTask = await this.findTaskById(id);

        const deleteTaskById = await this.prismaService.task.delete({
            where: {
                id: findOneTask.id,
            },
        });

        if (!deleteTaskById) {
            throw new BadRequestException(
                'Task with this id can not be deleted',
            );
        }

        return deleteTaskById;
    }
}
