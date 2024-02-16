import {
    Controller,
    Get,
    Param,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ViewProjectsDto } from './dto/view-projects.dto';
import { ViewOwnerProjectsDto } from './dto/view-owner-projects-dto';

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
}
