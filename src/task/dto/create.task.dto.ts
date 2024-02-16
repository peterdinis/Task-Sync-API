import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { ImporatntPriority } from "@prisma/client";

export class CreateTaskDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean;

    @IsString()
    @IsOptional()
    @IsDateString()
    createdAt?: string;
    
    @IsEnum(ImporatntPriority)
    @IsOptional()
    @Transform(({value}) => ("" + value).toLowerCase())
    imporatntPriority?: ImporatntPriority
}