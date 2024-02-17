import { IsArray, IsNotEmpty } from "class-validator";
import { ViewProjectsDto } from "src/project/dto/view-projects.dto";

export class ProjectMembershipDto {
    @IsArray()
    @IsNotEmpty()
    project: ViewProjectsDto;

    @IsArray()
    @IsNotEmpty()
    user: any;
}