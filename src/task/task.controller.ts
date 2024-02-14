import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Tasks")
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
}
