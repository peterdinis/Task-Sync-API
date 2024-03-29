import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { ViewProjectsDto } from './dto/view-projects.dto';
import { ViewOwnerProjectsDto } from './dto/view-owner-projects-dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddMemberToProjectDto } from './dto/add-member-to-project-dto';
import { DeleteMemberFromProjectDto } from './dto/delete-member-from-project.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @ApiOperation({
        summary: 'Find all created projects',
    })
    @ApiOkResponse({
        status: 200,
        type: [ViewProjectsDto],
    })
    @Get('/')
    async returnAllProjects() {
        return this.projectService.getAllProjects();
    }

    @ApiOperation({
        summary: 'Find all sorted projects',
    })
    @ApiOkResponse({
        status: 200,
        type: [ViewProjectsDto],
    })
    @Get('/sorted')
    async sortedProjects() {
        return this.projectService.getNewSortedProjects();
    }

    @ApiOperation({
        summary: 'Return project detail',
    })
    @ApiOkResponse({
        status: 200,
        type: ViewProjectsDto,
    })
    @Get('/:id')
    async returnProjectInfo(@Param('id') id: string) {
        return this.projectService.findProjectById(id);
    }

    @ApiOperation({
        summary: 'Find all owner projects',
    })
    @ApiOkResponse({
        status: 200,
        type: [ViewOwnerProjectsDto],
    })
    @Get('/owner/:username')
    async returnAllOwnerProjects(
        @Param('ownerUsername') ownerUsername: string,
    ) {
        return this.projectService.findOwnerProjects(ownerUsername);
    }

    @ApiOperation({
        summary: 'Find detail info about owner project',
    })
    @ApiOkResponse({
        status: 200,
        type: ViewOwnerProjectsDto,
    })
    @Get('/owner/:username/:id')
    async returnInfoAboutOneOfOwnerProject(
        @Param('ownerUsername') ownerUsername: string,
        @Param('projectId') projectId: string,
    ) {
        return this.projectService.findOwnerProjectDetail(
            ownerUsername,
            projectId,
        );
    }

    @ApiOperation({
        summary: 'Create new project',
    })
    @ApiCreatedResponse({
        status: 201,
        type: CreateProjectDto,
    })
    @UsePipes(new ValidationPipe())
    @Post('/')
    async createNewProject(@Body() projectDto: CreateProjectDto) {
        return this.projectService.createProject(projectDto);
    }

    @ApiOperation({
        summary: 'Update project',
    })
    @ApiOkResponse({
        status: 204,
        type: UpdateProjectDto,
    })
    @UsePipes(new ValidationPipe())
    @Put('/:id/update')
    async updateProject(
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto,
    ) {
        return this.projectService.updateProject(id, updateProjectDto);
    }

    @ApiOperation({
        summary: 'Delete project',
    })
    @ApiOkResponse({
        status: 200,
    })
    @Delete('/:id/:username/delete')
    async deleteProject(
        @Param('id') id: string,
        @Param('ownerUsername') ownerUsername: string,
    ) {
        return this.projectService.deleteProject(ownerUsername, id);
    }

    @ApiOperation({
        summary: 'Paginated projects',
    })
    @ApiOkResponse({
        status: 200,
    })
    @Get('/paginate')
    async paginatedProjects(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
    ) {
        return this.projectService.paginatedProjects(page, pageSize);
    }

    @ApiOperation({
        summary: 'Search for project by projectName',
    })
    @ApiOkResponse({
        status: 200,
    })
    @Get('/search')
    async searchForSpecificProject(@Query('projectName') projectName: string) {
        return this.projectService.searchProjectByName(projectName);
    }

    @ApiOperation({
        summary: 'Add new member to project',
    })
    @ApiCreatedResponse({
        status: 201,
        type: AddMemberToProjectDto,
    })
    @Post('/member/add')
    async addNewMember(@Body() addMemberDto: AddMemberToProjectDto) {
        return this.projectService.addNewMemberToProject(addMemberDto);
    }

    @ApiOperation({
        summary: 'Delete member from project',
    })
    @ApiOkResponse({
        status: 200,
        type: DeleteMemberFromProjectDto,
    })
    @Delete('/member/delete')
    async deleteMemberFromProject(
        @Body() deleteMemberDto: DeleteMemberFromProjectDto,
    ) {
        return this.projectService.removeMemberFromProject(deleteMemberDto);
    }
}
