import { ApiProperty } from '@nestjs/swagger';
import { ViewEpicsDto } from 'src/epic/dto/view-epics.dto';
import { ViewTaskDto } from 'src/task/dto/view.task.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class ViewProjectsDto {
    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    members: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    ownerUsername: string;

    @ApiProperty()
    projectName: string;

    @ApiProperty()
    tasks: ViewTaskDto;

    @ApiProperty()
    epic: ViewEpicsDto;

    @ApiProperty()
    membersList: UserDto;
}
