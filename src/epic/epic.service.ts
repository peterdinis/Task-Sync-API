import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async createNewEpic() {}

    async updateEpic() {
        
    }
}
