import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddMemberToProjectDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    projectId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;
}
