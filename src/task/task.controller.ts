import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { ViewTaskDto } from './dto/view.task.dto';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';

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
        summary: 'Return all completed tasks',
    })
    @ApiOkResponse({
        status: 200,
    })
    @Get('/completed')
    async returnAllCompletedTasks() {
        return this.taskService.findAllCompletedTasks();
    }

    @ApiOperation({
        summary: 'Find all non completed tasks',
    })
    @ApiOkResponse({
        status: 200,
    })
    @Get('/noncompleted')
    async returnAllNonCompletedTasks() {
        return this.taskService.findNonCompletedTasks();
    }

    @ApiOperation({
        summary: 'Find all sorted tasks',
    })
    @ApiOkResponse({
        status: 200,
    })
    @Get('/sorted')
    async allSortedTasks() {
        return this.taskService.sortedTasks();
    }

    @ApiOperation({
        summary: 'Create new task',
    })
    @ApiCreatedResponse({
        status: 201,
        type: CreateTaskDto,
    })
    @Post('/create')
    async createNewTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createNewTask(createTaskDto);
    }

    @ApiOperation({
        summary: 'Update task',
    })
    @ApiOkResponse({
        status: 200,
        type: UpdateTaskDto,
    })
    @Put('/:id/update')
    async updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        return this.taskService.updateTask(id, updateTaskDto);
    }

    @ApiOperation({
        summary: 'Delete task',
    })
    @ApiOkResponse({
        status: 200,
    })
    @Delete('/:id/delete')
    async deleteTask(@Param('id') id: string) {
        return this.taskService.deleteTask(id);
    }

    @ApiOperation({
        summary: 'Paginated tasks',
    })
    @ApiOkResponse({
        status: 200,
    })
    @Get('/paginate')
    async paginatedTasks(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
    ) {
        return this.taskService.paginatedTasks(page, pageSize);
    }

    @ApiOperation({
        summary: 'Search for project by name',
    })
    @ApiOkResponse({
        status: 200,
    })
    @Get('/search')
    async searchForTaskByName(@Query('name') name: string) {
        return this.taskService.searchTaskByName(name);
    }
}
