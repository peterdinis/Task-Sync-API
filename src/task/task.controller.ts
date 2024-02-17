import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ViewTaskDto } from './dto/view.task.dto';
import { CreateTaskDto } from './dto/create.task.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @ApiOperation({
        summary: 'Return all tasks',
    })
    @ApiOkResponse({
        status: 200,
        type: [ViewTaskDto],
    })
    @Get('/')
    async findAllTasks() {
        return this.taskService.getAllTasks();
    }

    @ApiOperation({
        summary: 'Find task by id',
    })
    @ApiOkResponse({
        status: 200,
        type: ViewTaskDto,
    })
    @Get('/:id')
    async findTaskById(@Param('id') id: string) {
        return this.taskService.getTaskById(id);
    }

    @ApiOperation({
        summary: 'Find all tasks for project',
    })
    @ApiOkResponse({
        status: 200,
    })
    @Get('/project/:projectId')
    async findAllTasksForSpecificProject(
        @Param('projectId') projectId: string,
    ) {
        return this.taskService.findAllProjectTasks(projectId);
    }

    @ApiOperation({
        summary: "Return all completed tasks"
    })
    @ApiOkResponse({
        status: 200,
    })
    @Get("/completed")
    async returnAllCompletedTasks() {
        return this.taskService.findAllCompletedTasks();
    }

    @ApiOperation({
        summary: "Find all non completed tasks"
    })
    @ApiOkResponse({
        status: 200
    })
    @Get("/noncompleted")
    async returnAllNonCompletedTasks() {
        return this.taskService.findNonCompletedTasks();
    }

    @ApiOperation({
        summary: "Create new task"
    })
    @ApiCreatedResponse({
        status: 201,
        type: CreateTaskDto
    })
    @Post("/create")
    async createNewTask(@Body() createTaskDto: any) {
        return this.taskService.createNewTask(createTaskDto);
    }
}
