import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllProjects() {
        const allProjects = await this.prismaService.project.findMany();
        if(!allProjects) {
            throw new NotFoundException("No projects found");
        }

        return allProjects;
    }

    async findProjectById(id: string) {
        const oneProject = await this.prismaService.project.findFirst({
            where: {
                id
            }
        })

        if(!oneProject) {
            throw new NotFoundException("Project with this id not found");
        }

        return oneProject;
    }

    async findOwnerProjects(ownerUsername: string) {
        const allOwnerProjects = await this.prismaService.project.findMany({
            where: {
                ownerUsername
            }
        });

        if(!allOwnerProjects) {
            throw new NotFoundException("This user not owned any project");
        }

        return allOwnerProjects;
    }

    async findOwnerProjectDetail(ownerUsername: string, projectId: string) {
        const onwerProjectInfo = await this.prismaService.project.findMany({
            where: {
                ownerUsername,
                id: projectId
            }
        });

        if(!onwerProjectInfo) {
            throw new NotFoundException("This user not owned this project with this id");
        }

        return onwerProjectInfo;
    }

}
