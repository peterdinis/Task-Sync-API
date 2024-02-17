import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ViewProjectsDto {
    @IsNotEmpty()
    @IsDate()
    @IsDateString()
    createdAt: string;

    @IsNotEmpty()
    @IsNumber()
    members: number;

    @IsNotEmpty()
    @IsString()
    ownerUsername: string;

    @IsNotEmpty()
    @IsString()
    projectName: string;

    // TODO: Later add more fileds
}