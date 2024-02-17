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

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean;

    @IsDateString()
    @IsOptional()
    createdAt?: string;

    @IsEnum(ImporatntPriority)
    @IsOptional()
    @Transform(({ value }) => ('' + value).toLowerCase())
    imporatntPriority?: ImporatntPriority;

    @IsNotEmpty()
    @IsString()
    reporter: string;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    projectId: string;

    @IsBoolean()
    @IsNotEmpty()
    isDone: boolean;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    totalSec: number;

    @IsBoolean()
    @IsNotEmpty()
    startWorkingOnTask: boolean;
}
