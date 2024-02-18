import { ApiProperty } from '@nestjs/swagger';
import { ViewProjectsDto } from 'src/project/dto/view-projects.dto';
import { ViewTaskDto } from 'src/task/dto/view.task.dto';

export class ViewEpicsDto {
    @ApiProperty()
    createdAt: string | Date;

    @ApiProperty()
    name: string;

    @ApiProperty()
    project: ViewProjectsDto;

    @ApiProperty()
    isFinished: boolean;

    @ApiProperty()
    description: string;

    @ApiProperty()
    tasks: ViewTaskDto;
}
