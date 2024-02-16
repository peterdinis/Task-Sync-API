import { IsBoolean, IsDateString, IsOptional, IsString } from "class-validator";

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

    
}