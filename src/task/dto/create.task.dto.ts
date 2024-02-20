import {
    IsBoolean,
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ImporatntPriority } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    isCompleted?: boolean;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    createdAt?: string;

    @IsEnum(ImporatntPriority)
    @IsOptional()
    @Transform(({ value }) => ('' + value).toLowerCase())
    imporatntPriority?: ImporatntPriority;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    reporter: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    userId: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    projectId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    imageInfo: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    totalSec: number;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    startWorkingOnTask: boolean;
}
