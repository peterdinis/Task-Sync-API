import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EpicService } from './epic.service';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ViewEpicsDto } from './dto/view-epics.dto';
import { CreateEpicDto } from './dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto';

@Controller('epic')
export class EpicController {
    constructor(private readonly epicService: EpicService) {}

    @ApiOperation({
        summary: 'Return all epics',
    })
    @ApiOkResponse({
        status: 200,
        type: [ViewEpicsDto],
    })
    @Get('/')
    async getAllEpics() {
        return this.epicService.getAllEpics();
    }

    @ApiOperation({
        summary: 'Find epic by id',
    })
    @ApiOkResponse({
        status: 200,
        type: ViewEpicsDto,
    })
    @Get('/:id')
    async getEpicById(@Param('id') id: string) {
        return this.epicService.getEpicById(id);
    }

    @ApiOperation({
        summary: "Find all epics in project"
    })
    @ApiOkResponse({
        status: 200
    })
    @Get("/:projectId/all")
    async findAllEpicsForProject(@Param("projectId") projectId: string) {
        return this.epicService.getAllEpicsForProject(projectId);
    }

    @ApiOperation({
        summary: "Epic detail in specific project"
    })
    @ApiOkResponse({
        status: 200
    })
    @Get("/:projectId/:epicId/info")
    async epicDetailInProject(
        @Param("projectId") projectId: string,
        @Param("epicId") epicId: string
    ) {
        return this.epicService.epicDetailInSpecificProject(projectId, epicId)
    }

    @ApiOperation({
        summary: "Create new epic"
    })
    @ApiCreatedResponse({
        status: 201,
        type: CreateEpicDto
    })
    @Post("/")
    async createNewEpic(@Body() epicDto: CreateEpicDto) {
        return this.epicService.createNewEpic(epicDto);
    }

    @ApiOperation({
        summary: "Update epic"
    })
    @ApiOkResponse({
        status: 200,
        type: UpdateEpicDto
    })
    @Put("/:epicId/update")
    async updateEpic(
        @Param("epicId") epicId: string,
        @Body() updateEpicDto: UpdateEpicDto
    ) {
        return this.epicService.updateEpic(epicId, updateEpicDto);
    }
}
