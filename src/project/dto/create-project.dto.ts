import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    projectName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    ownerUsername: string;
}
