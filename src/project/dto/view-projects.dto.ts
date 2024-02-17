import { ApiProperty } from '@nestjs/swagger';

export class ViewProjectsDto {
    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    members: number;

    @ApiProperty()
    ownerUsername: string;

    @ApiProperty()
    projectName: string;

    // TODO: Later add more fileds
}
