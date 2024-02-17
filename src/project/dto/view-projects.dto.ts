import { ApiProperty } from '@nestjs/swagger';
import {
    IsDate,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class ViewProjectsDto {
    @IsNotEmpty()
    @IsDate()
    @IsDateString()
    @ApiProperty()
    createdAt: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    members: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    ownerUsername: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    projectName: string;

    // TODO: Later add more fileds
}
