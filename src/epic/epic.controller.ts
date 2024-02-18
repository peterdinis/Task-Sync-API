import { Controller, Get, Param } from '@nestjs/common';
import { EpicService } from './epic.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ViewEpicsDto } from './dto/view-epics.dto';

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
}
