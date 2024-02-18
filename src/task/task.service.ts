import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';
import { UpdateTaskDto } from './dto/update.task.dto';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TaskService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly projectService: ProjectService,
        private readonly usersService: UsersService,
    ) {}

    async getAllTasks() {
        const findAllTasks = await this.prismaService.task.findMany();
        return findAllTasks;
    }

    async getTaskById(id: string) {
        const findOneTask = await this.prismaService.task.findUnique({
            where: {
                id,
            },
        });

        if (!findOneTask) {
            throw new NotFoundException('Task with this id does not exists');
        }

        return findOneTask;
    }

    async findAllProjectTasks(projectId: string) {
        const findOneProject =
            await this.projectService.findProjectById(projectId);

        const findAllTasksRelatedToProject =
            await this.prismaService.task.findMany({
                where: {
                    projectId: findOneProject.id,
                },
            });

        if (!findAllTasksRelatedToProject) {
            throw new NotFoundException(
                'Could not found any tasks for requested project',
            );
        }

        return findAllTasksRelatedToProject;
    }

    async findAllCompletedTasks() {
        const findAllTasksThatAreCompleted =
            await this.prismaService.task.findMany({
                where: {
                    isCompleted: true,
                },
            });

        if (!findAllTasksThatAreCompleted) {
            throw new NotFoundException('No tasks are completed');
        }

        return findAllTasksThatAreCompleted;
    }

    async findNonCompletedTasks() {
        const findAllTasksThatAreCompleted =
            await this.prismaService.task.findMany({
                where: {
                    isCompleted: false,
                },
            });

        if (!findAllTasksThatAreCompleted) {
            throw new NotFoundException('No tasks are completed');
        }

        return findAllTasksThatAreCompleted;
    }

    async sortedTasks() {
        const tasksSorted = await this.prismaService.task.findMany({
            orderBy: {
                createdAt: Prisma.SortOrder.asc,
            },
        });

        if (!tasksSorted) {
            throw new NotFoundException('No tasks found');
        }

        return tasksSorted;
    }

    async findMyReportedTasks(userId: string) {
        const findExistingUserById = await this.usersService.findOne(userId);
        if (!findExistingUserById) {
            throw new NotFoundException('User not found');
        }

        const findAllMyReportedTasks = await this.prismaService.task.findMany({
            where: {
                reporter: findExistingUserById.username,
            },
        });

        if (!findAllMyReportedTasks) {
            throw new BadRequestException('User does not report any tasks');
        }

        return findAllMyReportedTasks;
    }

    async paginatedTasks(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const tasks = await this.prismaService.task.findMany({
            orderBy: { createdAt: Prisma.SortOrder.asc },
            skip,
            take,
        });

        if (!tasks || tasks.length === 0) {
            throw new NotFoundException('No tasks found');
        }

        return tasks;
    }

    async searchTaskByName(taskName: string) {
        const searchForTask = await this.prismaService.task.findFirst({
            where: {
                name: {
                    contains: taskName,
                    mode: 'insensitive',
                },
            },

            orderBy: {
                createdAt: Prisma.SortOrder.asc,
            },
        });

        if (!searchForTask) {
            throw new NotFoundException('No task with this name was found');
        }

        return searchForTask;
    }

    async createNewTask(createTaskDto: any) {
        const newTask = await this.prismaService.task.create({
            data: {
                ...createTaskDto,
            },
        });

        if (!newTask) {
            throw new BadRequestException('Failed to create new tasks');
        }

        return newTask;
    }

    async updateTask(taskId: string, updateTaskDto: UpdateTaskDto) {
        const findOneTaskById = await this.getTaskById(taskId);

        const updateTask = await this.prismaService.task.update({
            where: {
                id: findOneTaskById.id,
            },
            data: {
                ...updateTaskDto,
            },
        });

        if (!updateTask) {
            throw new BadRequestException('Could not update task');
        }

        return updateTask;
    }

    async deleteTask(taskId: string) {
        const findOneTaskById = await this.getTaskById(taskId);

        const deleteTask = await this.prismaService.task.delete({
            where: {
                id: findOneTaskById.id,
            },
        });

        return deleteTask;
    }
}
