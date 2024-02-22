import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {compare} from "bcrypt";
import { Prisma } from '@prisma/client';
import { AddMemberToProjectDto } from './dto/add-member-to-project-dto';
import { DeleteMemberFromProjectDto } from './dto/delete-member-from-project.dto';

@Injectable()
export class ProjectService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllProjects() {
        const allProjects = await this.prismaService.project.findMany();
        if (!allProjects) {
            throw new NotFoundException('No projects found');
        }

        return allProjects;
    }

    async getNewSortedProjects() {
        const allProjects = await this.prismaService.project.findMany({
            orderBy: {
                createdAt: Prisma.SortOrder.asc,
            },
        });

        if (!allProjects) {
            throw new NotFoundException('No projects found');
        }

        return allProjects;
    }

    async findProjectById(id: string) {
        const oneProject = await this.prismaService.project.findFirst({
            where: {
                id,
            },
        });

        if (!oneProject) {
            throw new NotFoundException('Project with this id not found');
        }

        return oneProject;
    }

    async findOwnerProjects(ownerUsername: string) {
        const allOwnerProjects = await this.prismaService.project.findMany({
            where: {
                ownerUsername,
            },
        });

        if (!allOwnerProjects) {
            throw new NotFoundException('This user not owned any project');
        }

        return allOwnerProjects;
    }

    async findOwnerProjectDetail(ownerUsername: string, projectId: string) {
        const onwerProjectInfo = await this.prismaService.project.findMany({
            where: {
                ownerUsername,
                id: projectId,
            },
        });

        if (!onwerProjectInfo) {
            throw new NotFoundException(
                'This user not owned this project with this id',
            );
        }

        return onwerProjectInfo;
    }

    async createProject(projectDto: CreateProjectDto) {
        const newProject = await this.prismaService.project.create({
            data: {
                ...projectDto,
            },
        });

        if (!newProject) {
            throw new BadRequestException(
                'Problem with creation of new project',
            );
        }

        return newProject;
    }

    async updateProject(projectId: string, projectDto: UpdateProjectDto) {
        const findProjectInfo = await this.findProjectById(projectId);

        if (
            !(await compare(
                findProjectInfo.ownerUsername,
                projectDto.ownerUsername,
            ))
        ) {
            throw new ConflictException(
                'You can not update project because you are not the owner',
            );
        }

        const updateProject = await this.prismaService.project.update({
            where: {
                id: projectId,
            },
            data: projectDto,
        });

        if (!updateProject) {
            throw new BadRequestException('Project can not be updated');
        }

        return updateProject;
    }

    async deleteProject(ownerUsername: string, projectId: string) {
        const findProjectInfo = await this.findProjectById(projectId);

        if (
            !(await compare(findProjectInfo.ownerUsername, ownerUsername))
        ) {
            throw new ConflictException(
                'You can not delete project because you are not the owner',
            );
        }

        const deleteProject = await this.prismaService.project.delete({
            where: {
                id: projectId,
            },
        });

        if (!deleteProject) {
            throw new ForbiddenException('Delete project failed');
        }

        return deleteProject;
    }

    async paginatedProjects(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const projects = await this.prismaService.project.findMany({
            orderBy: { createdAt: Prisma.SortOrder.asc },
            skip,
            take,
        });

        if (!projects || projects.length === 0) {
            throw new NotFoundException('No projects found');
        }

        return projects;
    }

    async searchProjectByName(projectName: string) {
        const projects = await this.prismaService.project.findMany({
            where: {
                projectName: {
                    contains: projectName,
                    mode: 'insensitive',
                },
            },
            orderBy: { createdAt: Prisma.SortOrder.asc },
        });

        if (!projects || projects.length === 0) {
            throw new NotFoundException('No projects found with this name');
        }

        return projects;
    }

    async addNewMemberToProject(addNewMemberDto: AddMemberToProjectDto) {
        const project = await this.prismaService.project.findUnique({
            where: { id: addNewMemberDto.projectId },
            include: { membersList: true },
        });

        const user = await this.prismaService.user.findUnique({
            where: { id: addNewMemberDto.userId },
        });

        if (!project || !user) {
            throw new NotFoundException('Project or user not found');
        }

        const isUserAlreadyMember = project.membersList.some(
            (member) => member.id === addNewMemberDto.userId,
        );

        if (isUserAlreadyMember) {
            throw new ConflictException(
                'User is already a member of the project',
            );
        }

        const newMembership: AddMemberToProjectDto =
            await this.prismaService.projectMembership.create({
                data: {
                    ...addNewMemberDto,
                },
            });

        return newMembership;
    }

    async removeMemberFromProject(deleteMemberDto: DeleteMemberFromProjectDto) {
        const project = await this.prismaService.project.findUnique({
            where: { id: deleteMemberDto.projectId },
            include: { membersList: true },
        });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        const memberIndex = project.membersList.findIndex(
            (member) => member.id === deleteMemberDto.userId,
        );

        if (memberIndex === -1) {
            throw new NotFoundException('User is not a member of the project');
        }

        const updateProjectMembers = await this.prismaService.project.update({
            where: { id: deleteMemberDto.projectId },
            data: {
                membersList: {
                    disconnect: { id: deleteMemberDto.userId },
                },
            },
        });

        return updateProjectMembers;
    }
}
