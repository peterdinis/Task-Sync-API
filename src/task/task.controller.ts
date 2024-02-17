import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ViewTaskDto } from './dto/view.task.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @ApiOperation({
        summary: "Return all tasks"
    })
    @ApiOkResponse({
        status: 200,
        type: [ViewTaskDto]
    })
    @Get("/")
    async findAllTasks() {
        return this.taskService.getAllTasks();
    }

}
