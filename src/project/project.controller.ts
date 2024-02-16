import {
    Controller,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Projects")
@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

}
