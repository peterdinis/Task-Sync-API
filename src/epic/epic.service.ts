import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectService } from 'src/project/project.service';

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
}
