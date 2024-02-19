import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectService } from 'src/project/project.service';
import { UpdateEpicDto } from './dto/update-epic.dto';
import { CreateEpicDto } from './dto/create-epic.dto';

@Injectable()
export class EpicService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly projectsService: ProjectService,
    ) {}

    async getAllEpics() {
        const allEpics = await this.prismaService.epic.findMany();
        return allEpics;
    }

    async getEpicById(epicId: string) {
        const findEpicById = await this.prismaService.epic.findUnique({
            where: {
                id: epicId,
            },
        });

        if (!findEpicById) {
            throw new NotFoundException('No epic found with this id');
        }

        return findEpicById;
    }

    async getAllEpicsForProject(projectId: string) {
        const findAllEpicsForProject = await this.prismaService.epic.findMany({
            where: {
                projectId
            }
        })

        if(!findAllEpicsForProject) {
            throw new NotFoundException("Specific project has no created epic")
        }

        return findAllEpicsForProject
    }

    async epicDetailInSpecificProject(projectId: string, epicId: string) {
        const findEpicDetailInProject = await this.prismaService.epic.findFirst({
            where: {
                id: epicId,
                projectId
            }
        })

        if(!findEpicDetailInProject) {
            throw new BadRequestException("Epic with this id does not exists in speific project. Check project or epic id");
        }
    }

    async createNewEpic(epicDto: CreateEpicDto) {
        const newEpic = await this.prismaService.epic.create({
            data: {
                ...epicDto
            }
        });

        if(!newEpic) {
            throw new BadRequestException("Create epic failed");
        }

        return newEpic;
    }

    async updateEpic(epicId: string, epicUpdateDto: UpdateEpicDto) {
        const findEpicById = await this.getEpicById(epicId);

        const updateEpicById = await this.prismaService.epic.update({
            where: {
                id: findEpicById.id
            },
            data: {
                ...epicUpdateDto
            }
        });

        if(!updateEpicById) {
            throw new ForbiddenException("Update failed");
        }

        return updateEpicById;
    }

    async finishEpic(epicId: string) {
        const findEpicById = await this.getEpicById(epicId);

        const finishOneEpic = await this.prismaService.epic.update({
            where: {
                id: findEpicById.id
            },
            data: {
                isFinished: true
            }
        });

        if(!finishOneEpic) {
            throw new ForbiddenException("Update failed");
        }

        return finishOneEpic;
    }

    
}
