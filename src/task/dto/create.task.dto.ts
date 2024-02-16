import {
    IsBoolean,
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ImporatntPriority } from '@prisma/client';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;

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

    @IsBoolean()
    @IsOptional()
    isImportant?: boolean;

    @IsNotEmpty()
    userId: string;
}
