import { ApiProperty } from '@nestjs/swagger';
import { ViewProjectsDto } from 'src/project/dto/view-projects.dto';

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
}
