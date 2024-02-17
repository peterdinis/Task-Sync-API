import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ViewProjectsDto } from './dto/view-projects.dto';
import { ViewOwnerProjectsDto } from './dto/view-owner-projects-dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags("Projects")
@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @ApiOperation({
        summary: "Find all created projects"
    })
    @ApiOkResponse({
        status: 200,
        type: [ViewProjectsDto]
    })
    @Get("/")
    async returnAllProjects() {
        return this.projectService.getAllProjects();
    }

    @ApiOperation({
        summary: "Return project detail"
    })
    @ApiOkResponse({
        status: 200,
        type: ViewProjectsDto
    })
    @Get("/:id")
    async returnProjectInfo(@Param("id") id: string) {
        return this.projectService.findProjectById(id);
    }

    @ApiOperation({
        summary: "Find all owner projects"
    })
    @ApiOkResponse({
        status: 200,
        type: [ViewOwnerProjectsDto]
    })
    @Get("/owner/:username")
    async returnAllOwnerProjects(@Param("ownerUsername") ownerUsername: string) {
        return this.projectService.findOwnerProjects(ownerUsername)
    }

    @ApiOperation({
        summary: "Find detail info about owner project"
    })
    @ApiOkResponse({
        status: 200,
        type: ViewOwnerProjectsDto
    })
    @Get("/owner/:username/:id")
    async returnInfoAboutOneOfOwnerProject(@Param("ownerUsername") ownerUsername: string, @Param("projectId") projectId: string) {
        return this.projectService.findOwnerProjectDetail(ownerUsername, projectId);
    }

    @ApiOperation({
        summary: "Create new project"
    })
    @ApiCreatedResponse({
        status: 201,
        type: CreateProjectDto
    })
    @Post("/")
    async createNewProject(@Body() projectDto: CreateProjectDto) {
        return this.projectService.createProject(projectDto);
    }

    @ApiOperation({
        summary: "Update project"
    })
    @ApiOkResponse({
        status: 204,
        type: UpdateProjectDto
    })
    @Put("/:id/update")
    async updateProject(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectService.updateProject(id, updateProjectDto);
    } 

    @ApiOperation({
        summary: "Delete project"
    })
    @ApiOkResponse({
        status: 200
    })
    @Delete("/:id/:username/delete")
    async deleteProject(@Param("id") id: string, @Param("ownerUsername") ownerUsername: string) {
        return this.projectService.deleteProject(ownerUsername, id)
    }
}
