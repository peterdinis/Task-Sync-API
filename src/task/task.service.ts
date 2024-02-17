import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';

@Injectable()
export class TaskService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly projectService: ProjectService,
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

    async createNewTask(createTaskDto: any) {
        const newTask = await this.prismaService.task.create({
            data: {
                ...createTaskDto
            }
        });

        if(!newTask) {
            throw new BadRequestException("Failed to create new tasks");
        }

        return newTask;
    }

    async updateTask(updateTaskDto: UpdateTaskDto) {}
}
